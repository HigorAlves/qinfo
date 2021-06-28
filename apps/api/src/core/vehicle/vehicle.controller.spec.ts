import { IVehicle } from '@jetpack/interfaces'
import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { LoggerModule } from '../../../test/mocks/logger.interceptor'
import {
	closeInMongodConnection,
	rootMongooseTestModule
} from '../../../test/utils/mongodb'
import { VehicleController } from './vehicle.controller'
import { VehicleRepository } from '~/core/vehicle/vehicle.repository'
import { VehicleService } from '~/core/vehicle/vehicle.service'
import { VehicleSchema } from '~/schemas/vehicle.schema'

describe('Vehicle Controller', () => {
	let controller: VehicleController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				rootMongooseTestModule(),
				MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }]),
				LoggerModule
			],
			providers: [VehicleService, VehicleRepository],
			controllers: [VehicleController]
		}).compile()

		controller = module.get<VehicleController>(VehicleController)
	})

	afterAll(done => {
		closeInMongodConnection()
		done()
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
