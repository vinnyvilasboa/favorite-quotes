const express = require('express')
const router = express.Router()
const quoteController = require('../controllers/quotes')

// /quotes
router.get('/', quoteController.index)
router.post('/quote', quoteController.createQuote)


module.exports = router