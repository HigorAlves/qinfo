import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

import { ErrorMessages } from '~/constants/dtoMessages'

export class VehicleDeleteDto {
	@ApiProperty()
	@IsNotEmpty({ message: ErrorMessages.isEmpty })
	@IsString({ message: ErrorMessages.isString })
	id: string
}
