import cors from 'cors'
import express, { Application } from 'express'
const app: Application = express()
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/user/user.route'
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.use('/api/v1/users', UserRoutes)
app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

// // Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   Promise.reject((new Error(`Unhandled Promise Rejection`)))
// })

// Global Error Handler
app.use(globalErrorHandler)

export default app
