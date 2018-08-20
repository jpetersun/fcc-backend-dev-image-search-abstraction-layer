const express = require('express')
const searchTermRouter = require('./searchTerm')
const apiErrorHandler = require('./modules/errorHandler')

const restRouter = express.Router()

restRouter.use('/imagesearch', searchTermRouter)
restRouter.use(apiErrorHandler)

module.exports = restRouter
