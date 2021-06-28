import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { VehicleModule } from './vehicle/vehicle.module'
import ENV_CONFIG from '~/config/configuration'
import { MONGO_DB_CONFIG } from '~/config/mongoose.config'
import { LoggerModule } from '~/interceptors/logger.interceptor'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['.development.env', '.production.env', '.env'],
			load: [ENV_CONFIG],
			isGlobal: true
		}),
		MongooseModule.forRoot(MONGO_DB_CONFIG.url, {
			useNewUrlParser: true,
			useCreateIndex: true
		}),
		LoggerModule,
		VehicleModule
	]
})
export class AppModule {}
