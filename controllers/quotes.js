const express = require('express')
const Quote = require('../models/quote')

module.exports = {index, createQuote, getAllQuotes, access}


// Index
async function index (req, res){
    try{
        res.render('Quotes', {quotes: 'nonde', access: false})
    } catch(e) {
        res.status(400).json(e)
    }
}

//access to quotes
async function access (req, res){
    const {password} = req.body
    console.log(password)
    try{
        const quotes = await Quote.find({})
        if(!password || password !== process.env.QUOTES_PASS){
            res.redirect('/quotes')
        } else {
            console.log('Render!!!!!!!!!!!!!!!!!!!')
            res.render('Quotes', {quotes, access: true})
        }
    } catch(e){
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