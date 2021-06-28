import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { VehicleController } from './vehicle.controller'
import { VehicleService } from './vehicle.service'
import { VehicleRepository } from '~/core/vehicle/vehicle.repository'
import { LoggerModule } from '~/interceptors/logger.interceptor'
import { VehicleSchema } from '~/schemas/vehicle.schema'

@Module({
	imports: [
		LoggerModule,
		MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }])
	],
	providers: [VehicleService, VehicleRepository],
	controllers: [VehicleController]
})
export class VehicleModule {}
