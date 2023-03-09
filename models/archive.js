const mongoose = require('mongoose')
const Schema = mongoose.Schema

const archiveSchema = new Schema({
    quotes: Object,
})

const Archive = mongoose.model('Archive', archiveSchema)

module.exports = Archive