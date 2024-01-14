import { IGenericErrorMessage } from './../../interfaces/error'
import { ErrorRequestHandler } from 'express'
import config from '../../config'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'

const globalErrorHandler : ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500
  let message = 'Something Went Wrong!'
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if(err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message?
    [
        {
            path: ``,
            message: err?.message
        }
    ] : []
  } else if(err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message?
    [
        {
            path: ``,
            message: err?.message
        }
    ] : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
