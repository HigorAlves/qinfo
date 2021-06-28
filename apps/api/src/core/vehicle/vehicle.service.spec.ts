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
import { VehicleDocument, VehicleSchema } from '~/schemas/vehicle.schema'

describe('Vehicle Service', () => {
	let service: VehicleService
	const vehicle: IVehicle = {
		ano: '2021',
		chassi: 'test',
		marca: 'test',
		modelo: 'test',
		placa: 'test',
		renavam: 'test'
	}
	let vehicleID = ''

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
		const result: IResponse<string> = await service.registerVehicle(vehicle)
		vehicleID = result.data
		expect(result.status).toEqual(HTTP_CODE.Created)
	})

	it('should get vehicle data based on ID', async () => {
		const result: IResponse<boolean | VehicleDocument> = await service.read(
			vehicleID
		)
		expect(result.status).toEqual(HTTP_CODE.OK)
	})

	it('should not get vehicle data based on ID', async () => {
		const result: IResponse<boolean | VehicleDocument> = await service.read('')
		expect(result.status).toEqual(HTTP_CODE.NoContent)
	})

	it('should not get a list of vehicle', async () => {
		const result: IResponse<VehicleDocument[] | null> = await service.list()
		expect(result.status).toEqual(HTTP_CODE.OK)
		console.log(result.data)
		expect(result.data).toHaveLength(1)
	})

	it('should delete vehicle', async () => {
		const result: IResponse<boolean | VehicleDocument> = await service.remove(
			vehicleID
		)
		expect(result.status).toEqual(HTTP_CODE.OK)
	})

	it('should update vehicle', async () => {
		const newVehicle: IVehicle = {
			ano: '2022',
			chassi: 'update',
			marca: 'update',
			modelo: 'update',
			placa: 'update',
			renavam: 'update'
		}
		const result: IResponse<boolean | VehicleDocument> = await service.update(
			vehicleID,
			newVehicle
		)
		expect(result.status).toEqual(HTTP_CODE.UPDATED)
	})
})
