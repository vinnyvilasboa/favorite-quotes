const express = require('express')
const Quote = require('../models/quote')

const router = express.Router()


// Index
router.get('/', async (req, res) => {
    try{
        const quotes = await Quote.find({})
        res.status(200).json(quotes)
    } catch(e) {
        res.status(400).json(e)
    }
})

// Create Quote
router.post('/quote', (req, res) => {
    Quote.create(req.body)
        .then((createdQuote) => {
            console.log('Quote Created ', createdQuote)
            res.render('/')
        })
        .catch((err) => [
            res.status(403).send(err)
        ])
})


module.exports = router