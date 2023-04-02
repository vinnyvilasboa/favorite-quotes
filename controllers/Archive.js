express = require('express')
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

module.exports = router