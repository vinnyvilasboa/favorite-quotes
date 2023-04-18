const express = require('express')
const Archive = require('../models/archive')


//Get all Archives
const allArchives = async () => {
    try {
        const archives = await Archive.find({})
        return archives
    } catch (e) {
        console.log(e)
        return e
    }
}


// Create Archive quote
const newArchive = async (quote) => {
    try {
        console.log('New Archive')
        console.log(quote)
        // console.log(req.body)
        await Archive.create({ quoteId: quote._id, quote: quote.quote, author: quote.author })
    } catch (err) {
        console.log(err)
    }
}

//Delete Archive
const removeArchive = async (id) => {
    try {
        return await Archive.findOneAndDelete({ quoteId: id })
    } catch (e) {
        console.log(e)
        return e
    }
}

module.exports = {allArchives, newArchive, removeArchive}