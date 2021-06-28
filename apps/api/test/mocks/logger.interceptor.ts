import { Injectable, Logger as NestLogger, Module, Scope } from '@nestjs/common'

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends NestLogger {
	constructor() {
		super()
	}

	log(message: string, metadata?: unknown) {
		console.log(message, metadata)
	}

	warn(message: string, metadata?: unknown) {
		console.log(message, metadata)
	}

	error(message: string, metadata?: unknown) {
		console.log(message, metadata)
	}

	debug(message: string, metadata?: unknown) {
		console.log(message, metadata)
	}

	verbose(message: string, metadata?: unknown) {
		console.log(message, metadata)
	}
}

@Module({
	providers: [Logger],
	exports: [Logger]
})
export class LoggerModule {}
