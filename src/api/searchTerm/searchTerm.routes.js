const controller = require('./searchTerm.controller')
const router = require('express').Router()

router.get('/:searchTerm', controller.getSearchTerm)
router.get('/', controller.getRecentTerms)

module.exports = router
