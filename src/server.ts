import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', err => {
  errorLogger.error(err)
  process.exit(1)
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`🟢 Database is connected successfully!`)

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`failed to connect database: ${error}`)
  }

  process.on('unhandledRejection', error => {
    // console.log(`Unhandled rejection detected, we are closing our server: ${error}`)
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
