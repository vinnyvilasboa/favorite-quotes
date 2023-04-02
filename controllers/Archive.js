const express = require('express')
const Archive = require('../models/archive')

const router = express.Router()


// Create Archive
router.post('/', (req, res) => {
    Archive.create(req.body)
        .then((quote) => {
            console.log('Quote Archived ', quote)
        })
        .catch((err) => {
            console.log(err)
        })
})

// Delete Archive
router.delete('/', (req, res) => {
    try{
        console.log(req)
        console.log(req.body)
    } catch(err) {
        console.log(err)
    }
})

module.exports = router