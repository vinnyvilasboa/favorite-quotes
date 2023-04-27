const express = require('express')
const router = express.Router()
const quoteController = require('../controllers/quotes')

// /quotes
router.get('/', quoteController.index)
router.get('/new', quoteController.newQuote)
router.post('/access', quoteController.access)
router.post('/quote', quoteController.createQuote)
router.get('/edit/:access/:id', quoteController.edit)
router.put('/:id', quoteController.update)
router.delete('/:id', quoteController.Delete)


module.exports = router