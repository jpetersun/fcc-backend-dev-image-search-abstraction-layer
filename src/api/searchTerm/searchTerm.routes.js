import controller from './searchTerm.controller'
import { Router } from 'express'
const router = Router()

router.get('/:searchTerm', controller.getSearchTerm)
router.get('/', controller.getRecentTerms)

export default router
