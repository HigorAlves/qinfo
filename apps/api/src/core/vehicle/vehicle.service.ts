import { IVehicle } from '@jetpack/interfaces'
import { Injectable } from '@nestjs/common'
import * as Sentry from '@sentry/node'

import { HTTP_CODE } from '~/constants/httpCode'
import { VehicleRepository } from '~/core/vehicle/vehicle.repository'
import { Logger } from '~/interceptors/logger.interceptor'
import { VehicleDocument } from '~/schemas/vehicle.schema'

@Injectable()
export class VehicleService {
	constructor(private repository: VehicleRepository, private logger: Logger) {
		this.logger.setContext('VEHICLE_SERVICE')
	}

	async registerVehicle(data: IVehicle): Promise<IResponse<string | null>> {
		try {
			const result = await this.repository.create(data)
			if (result) {
				this.logger.log('New vehicle was registered')

				return {
					status: HTTP_CODE.Created,
					error: false,
					message: 'Vehicle has been registrated',
					data: result as string
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

	async read(id: string): Promise<IResponse> {
		try {
			const result = await this.repository.read(id)
			if (result) {
				this.logger.log('Trying to get vehicle with ID: ', id)
				return {
					status: HTTP_CODE.OK,
					error: false,
					message: 'All seens ok'
				}
			} else {
				return {
					status: HTTP_CODE.NoContent,
					error: false,
					message: 'All seens ok'
				}
			}
		} catch (e) {
			Sentry.withScope(scope => {
				scope.addBreadcrumb({
					category: 'VEHICLE',
					message: 'Cannont get the vehicle',
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

	async list(): Promise<IResponse<VehicleDocument[] | null>> {
		try {
			const result = await this.repository.list()
			if (result) {
				return {
					status: HTTP_CODE.OK,
					error: false,
					message: 'All seens ok',
					data: result as VehicleDocument[]
				}
			} else {
				return {
					status: HTTP_CODE.NoContent,
					error: false,
					message: 'All seens ok'
				}
			}
		} catch (e) {
			Sentry.withScope(scope => {
				scope.addBreadcrumb({
					category: 'VEHICLE',
					message: 'Cannont get a list of vehicle',
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
