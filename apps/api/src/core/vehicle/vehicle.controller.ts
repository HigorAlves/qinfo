import { Body, Controller, Post } from '@nestjs/common'
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

import { HTTP_CODE } from '~/constants/httpCode'
import { VehicleService } from '~/core/vehicle/vehicle.service'
import { VehicleCreateDto } from '~/DTOs/vehicle.create.dto'

@ApiTags('Vehicle')
@Controller('vehicle')
export class VehicleController {
	constructor(private readonly service: VehicleService) {}

	@ApiOkResponse({ description: 'Vehicle has been registrated' })
	@ApiResponse({
		status: HTTP_CODE.BadRequest,
		description: 'Cannot register inside DB the vehicle'
	})
	@Post()
	async create(
		@Body() data: VehicleCreateDto,
		res: Response
	): Promise<Response> {
		const response = await this.service.registerVehicle(data)
		return res.status(response.status).send(response)
	}
}
