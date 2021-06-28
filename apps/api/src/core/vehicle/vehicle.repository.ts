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
			return result.id
		} catch (e) {
			this.logger.error('ERROR: ', e)
			return false
		}
	}

	async read(id: string): Promise<VehicleDocument | boolean> {
		try {
			return await this.Database.findById(id)
		} catch (e) {
			this.logger.error('ERROR: ', e)
			return false
		}
	}

	async list(): Promise<VehicleDocument[] | boolean> {
		try {
			return await this.Database.find()
		} catch (e) {
			this.logger.error('ERROR: ', e)
			return false
		}
	}

	async remove(id: string): Promise<boolean> {
		try {
			await this.Database.findByIdAndDelete(id)
			return true
		} catch (e) {
			this.logger.error('ERROR: ', e)
			return false
		}
	}

	async update(id: string, data: IVehicle): Promise<boolean | VehicleDocument> {
		try {
			return await this.Database.findByIdAndUpdate(id, data)
		} catch (e) {
			this.logger.error('ERROR: ', e)
			return false
		}
	}
}
