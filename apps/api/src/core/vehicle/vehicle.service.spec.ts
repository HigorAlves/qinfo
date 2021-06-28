import { IVehicle } from '@jetpack/interfaces'
import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { LoggerModule } from '../../../test/mocks/logger.interceptor'
import {
	closeInMongodConnection,
	rootMongooseTestModule
} from '../../../test/utils/mongodb'
import { VehicleService } from './vehicle.service'
import { HTTP_CODE } from '~/constants/httpCode'
import { VehicleRepository } from '~/core/vehicle/vehicle.repository'
import { VehicleSchema } from '~/schemas/vehicle.schema'

describe('LeadService', () => {
	let service: VehicleService
	const vehicle: IVehicle = {
		ano: '2021',
		chassi: 'test',
		marca: 'test',
		modelo: 'test',
		placa: 'test',
		renavam: 'test'
	}

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				rootMongooseTestModule(),
				MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }]),
				LoggerModule
			],
			providers: [VehicleService, VehicleRepository]
		}).compile()

		service = module.get<VehicleService>(VehicleService)
	})

	afterAll(done => {
		closeInMongodConnection()
		done()
	})

	it('should be defined', async () => {
		expect(service).toBeDefined()
	})

	it('should create a vehicle inside database', async () => {
		const result: IResponse = await service.registerVehicle(vehicle)
		expect(result.status).toEqual(HTTP_CODE.Created)
	})
})
