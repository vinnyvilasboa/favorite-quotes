const express = require('express')
const Quote = require('../models/quote')

module.exports = {index, createQuote, getAllQuotes}


// Index
async function index (req, res){
    const password = req.query.password
    console.log(password)
    try{
        const quotes = await Quote.find({})
        if(!password){
            res.render('Access')
        } else {
            console.log('Quotes!!!!!!!!!!!!!!!!!')
            res.render('Quotes', {quotes})
        } 
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