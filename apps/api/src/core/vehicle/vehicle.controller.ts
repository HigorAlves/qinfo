import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

import { HTTP_CODE } from '~/constants/httpCode'
import { VehicleService } from '~/core/vehicle/vehicle.service'
import { VehicleCreateDto } from '~/DTOs/vehicle.create.dto'
import { VehicleUpdateDto } from '~/DTOs/vehicle.update.dto'

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

	@ApiOkResponse({ description: 'Get data from a vehicle' })
	@ApiResponse({
		status: HTTP_CODE.BadRequest,
		description: 'Cannot get the vehicle'
	})
	@Get()
	async read(@Body() { id }: { id: string }, res: Response): Promise<Response> {
		const response = await this.service.read(id)
		return res.status(response.status).send(response)
	}

	@ApiOkResponse({ description: 'Get a listof vehicles' })
	@ApiResponse({
		status: HTTP_CODE.BadRequest,
		description: 'Cannot get the list of vehicles'
	})
	@Get('/list')
	async list(res: Response): Promise<Response> {
		const response = await this.service.list()
		return res.status(response.status).send(response)
	}

	@ApiOkResponse({ description: 'Delete a single vehicle' })
	@ApiResponse({
		status: HTTP_CODE.BadRequest,
		description: 'Cannot delete the vehicle'
	})
	@Delete()
	async remove(
		@Body() { id }: { id: string },
		res: Response
	): Promise<Response> {
		const response = await this.service.remove(id)
		return res.status(response.status).send(response)
	}

	@ApiOkResponse({ description: 'Update a single vehicle' })
	@ApiResponse({
		status: HTTP_CODE.BadRequest,
		description: 'Cannot update the vehicle'
	})
	@Put()
	async update(
		@Body() data: VehicleUpdateDto,
		res: Response
	): Promise<Response> {
		const response = await this.service.update(data.id, data)
		return res.status(response.status).send(response)
	}
}
