import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'
import httpStatus from 'http-status'

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
app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        "success": false,
        "message": "Not Found",
        "errorMessages": [{
            path: req.originalUrl,
            message: "API Not Found!"
        }]
    })
    next();
})

export default app
