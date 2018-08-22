import { Router } from 'express'
import searchTermRouter from './searchTerm'
import apiErrorHandler from './modules/errorHandler'

const restRouter = Router()

restRouter.use('/imagesearch', searchTermRouter)
restRouter.use(apiErrorHandler)

export default restRouter
