import cors from 'cors'
import express, { Application } from 'express'
const app: Application = express()
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.use('/api/v1/users', UserRoutes)

// // Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // throw new ApiError(400, 'Generic Error')
//   next('Error occurred!')
// })

// Global Error Handler
app.use(globalErrorHandler)

export default app
