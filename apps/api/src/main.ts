import { join } from 'path'

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as Sentry from '@sentry/node'
import * as rateLimit from 'express-rate-limit'
import * as helmet from 'helmet'

import { LOG_DNA, PORT, SENTRY } from '~/constants'
import { AppModule } from '~/core/app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	const packageVersion = process.env.npm_package_version

	app.setViewEngine('hbs')
	app.useStaticAssets(join(__dirname, '..', 'public'))
	app.setBaseViewsDir(join(__dirname, '..', 'views'))

	const options = new DocumentBuilder()
		.setTitle('NOVAC BULL API')
		.setDescription('This is API Version')
		.setVersion(packageVersion)
		.build()
	const document = SwaggerModule.createDocument(app, options)

	SwaggerModule.setup('api', app, document)
	Sentry.init({
		dsn: SENTRY.dsn,
		tracesSampleRate: 1.0,
		debug: process.env.NODE_ENV === 'development',
		release: packageVersion,
		environment: LOG_DNA.env,
		attachStacktrace: true,
		serverName: LOG_DNA.app,
		integrations: [new Sentry.Integrations.Http({ tracing: true })]
	})

	app.use(helmet())
	app.enableCors()
	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100 // limit each IP to 100 requests per windowMs
		})
	)

	await app.listen(PORT)
	Logger.log(`🚀 Server running on ${await app.getUrl()}`, 'BOOTSTRAP')
}

bootstrap()
