import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type VehicleDocument = Document

@Schema()
export class Vehicle {
	@Prop()
	email: string

	@Prop()
	ano: string

	@Prop()
	chassi: string

	@Prop()
	marca: string

	@Prop()
	modelo: string

	@Prop()
	placa: string

	@Prop()
	renavam: string

	@Prop({ type: Date, default: new Date() })
	createdAt: Date
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle)
