import { IVehicle } from '@jetpack/interfaces'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { VehicleDocument } from '~/schemas/vehicle.schema'

@Injectable()
export class VehicleRepository {
	private logger = new Logger('VEHICLE_REPOSITORY')

	constructor(
		@InjectModel('Vehicle') private Database: Model<VehicleDocument>
	) {}

	async create(data: IVehicle): Promise<boolean | string> {
		const result = new this.Database(data)
		try {
			await result.save()
			return true
		} catch (e) {
			this.logger.error('ERROR: ', e)
			return false
		}
	}
}
