const express = require('express')
const Quote = require('../models/quote')

module.exports = {index, createQuote, getAllQuotes}


// Index
async function index (req, res){
    try{
        await Quote.find({})
            .then((quotes) => {
                res.render('Quotes', {quotes})
            })
            .catch((err) => {
                console.log(err)
                res.status(400).send(err)
            })
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


async function getAllQuotes (){
    try {
        const quotes = await Quote.find({})
        return quotes
    } catch (e) {
        console.log(e)
        return e
    }
}