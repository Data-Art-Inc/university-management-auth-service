import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'
const app: Application = express()

import usersService from './app/modules/users/users.service'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.use('/api/v1/users', usersRouter)

// // Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // throw new ApiError(400, 'Generic Error')
//   next('Error occurred!')
// })

// Global Error Handler
app.use(globalErrorHandler)

export default app
