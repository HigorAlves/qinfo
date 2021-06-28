import { Injectable, Scope, Logger as NestLogger, Module } from '@nestjs/common'
import * as LogdnaWinston from 'logdna-winston'
import { createLogger, Logger as winston } from 'winston'

import { LOG_DNA } from '~/constants'

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends NestLogger {
	private winston: winston
	private readonly logger = new NestLogger()

	constructor() {
		super()
		this.config()
	}

	config() {
		const options = {
			key: LOG_DNA.key,
			hostname: LOG_DNA.hostname,
			app: LOG_DNA.app,
			env: LOG_DNA.env,
			handleExceptions: LOG_DNA.handleExceptions
		}

		this.winston = createLogger({
			transports: []
		})
		this.winston.add(new LogdnaWinston(options))
	}

	log(message: string, metadata?: unknown) {
		this.logger.setContext(this.context)
		this.logger.log(message)
		this.winston.info(message, { context: this.context, metadata })
	}

	warn(message: string, metadata?: unknown) {
		this.logger.setContext(this.context)
		this.logger.warn(message)
		this.winston.warn(message, { context: this.context, metadata })
	}

	error(message: string, metadata?: unknown) {
		this.logger.setContext(this.context)
		this.logger.error(message)
		this.winston.error(message, { context: this.context, metadata })
	}

	debug(message: string, metadata?: unknown) {
		this.logger.setContext(this.context)
		this.logger.debug(message)
		this.winston.debug(message, { context: this.context, metadata })
	}

	verbose(message: string, metadata?: unknown) {
		this.logger.setContext(this.context)
		this.logger.verbose(message)
		this.winston.verbose(message, { context: this.context, metadata })
	}
}

@Module({
	providers: [Logger],
	exports: [Logger]
})
export class LoggerModule {}
