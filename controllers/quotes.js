const express = require('express')
const Quote = require('../models/quote')

module.exports = {index, createQuote, getAllQuotes, access, newQuote, edit, update}


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
    try{
        const quotes = await Quote.find({})
        if(!password || password !== process.env.QUOTES_PASS){
            res.redirect('/quotes')
        } else {
            res.render('Quotes', {quotes, access: true})
        }
    } catch(e){
        res.status(400).json(e)
    }
}

// New
async function newQuote (req, res) {
    res.render('New')
}

// Create Quote
async function createQuote (req, res){
    await Quote.create(req.body)
    const quotes = await Quote.find({})
    .then((createdQuote) => {
            console.log('Quote Created ', createdQuote)
            res.render('Quotes', {quotes, access: true})
        })
        .catch((err) => [
            res.status(403).send(err)
        ])
}

// Edit
async function edit (req, res) {
    const {id} = req.body
    try {
        const quote = await Quote.findById(id)
        res.render('Edit', {quote})
    } catch (error) {
        res.status(400).send(error)
    }

}

// Update
async function update (req, res) {
    const {id} = req.params
    try {
        await Quote.findByIdAndUpdate(id, req.body, {new: true})
        res.redirect('/quotes')
    } catch (error) {
        res.status(400).send(error)
    } 
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