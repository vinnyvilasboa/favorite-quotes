const mongoose = require('mongoose')
const Schema = mongoose.Schema

const archiveSchema = new Schema({
    quoteId: String,
    quote: String,
    author: String
})

const Archive = mongoose.model('Archive', archiveSchema)

module.exports = Archive