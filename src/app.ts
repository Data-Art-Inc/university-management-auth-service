import cors from 'cors'
import express, { Application } from 'express'
const app: Application = express()
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.use('/api/v1', routes);

// // Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   Promise.reject((new Error(`Unhandled Promise Rejection`)))
// })

// Global Error Handler
app.use(globalErrorHandler)

export default app
