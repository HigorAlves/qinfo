import { IVehicle } from '@jetpack/interfaces'
import { Injectable } from '@nestjs/common'
import * as Sentry from '@sentry/node'

import { HTTP_CODE } from '~/constants/httpCode'
import { VehicleRepository } from '~/core/vehicle/vehicle.repository'
import { Logger } from '~/interceptors/logger.interceptor'

@Injectable()
export class VehicleService {
	constructor(private repository: VehicleRepository, private logger: Logger) {
		this.logger.setContext('VEHICLE_SERVICE')
	}

	async registerVehicle(data: IVehicle): Promise<IResponse> {
		try {
			const result = await this.repository.create(data)
			if (result) {
				this.logger.log('New vehicle was registered')

				return {
					status: HTTP_CODE.Created,
					error: false,
					message: 'Vehicle has been registrated'
				}
			}
		} catch (e) {
			Sentry.withScope(scope => {
				scope.addBreadcrumb({
					category: 'VEHICLE',
					message: 'Cannont register a new vehicle inside DB',
					level: Sentry.Severity.Warning
				})
				Sentry.captureException(new Error(e))
			})
			return {
				status: HTTP_CODE.BadRequest,
				error: true,
				message: 'Something was wrong'
			}
		}
	}
}
