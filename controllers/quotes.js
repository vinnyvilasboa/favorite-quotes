const express = require('express')
const Quote = require('../models/quote')

module.exports = {index, createQuote, getAllQuotes, access, newQuote, edit, update, Delete}


// Index
async function index (req, res){
    try{
        res.render('Quotes', {quotes: 'none', access: false})
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

// Delete
async function Delete (req, res) {
    const {id} = req.params
    try {
        await Quote.findByIdAndDelete(id)
        res.redirect('/quotes')
    } catch (error) {
        res.status(400).json(error)
    }
}

// New
async function newQuote (req, res) {
    res.render('New')
}

// Create Quote
async function createQuote (req, res){
    await Quote.create(req.body)
    .then((createdQuote) => {
            console.log('quote created: ', createdQuote)
            res.redirect('/quotes')
        })
        .catch((err) => [
            res.status(403).json(err)
        ])
}

// Edit
async function edit (req, res) {
    const {access, id} = req.params
    try {
        if(access.toLowerCase() === "false") res.redirect('/quotes')
        const quote = await Quote.findById(id)
        res.render('Edit', {quote})
    } catch (error) {
        res.status(400).json(error)
    }

}

// Update
async function update (req, res) {
    const {id} = req.params
    try {
        await Quote.findByIdAndUpdate(id, req.body, {new: true})
        res.redirect('/quotes')
    } catch (error) {
        res.status(400).json(error)
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