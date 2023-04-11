const express = require('express')
const Quote = require('../models/quote')

module.exports = {index, createQuote}


// Index
async function index (req, res){
    try{
        const quotes = await Quote.find({})
        res.status(200).json(quotes)
    } catch(e) {
        res.status(400).json(e)
    }
}

// Create Quote
async function createQuote (req, res){
    Quote.create(req.body)
        .then((createdQuote) => {
            console.log('Quote Created ', createdQuote)
            res.render('/')
        })
        .catch((err) => [
            res.status(403).send(err)
        ])
}