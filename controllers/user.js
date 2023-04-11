const express = require('express')
const User = require('../models/user')


module.exports = {
    index,
    unsubscribe,
    deleteUser,
    createUser,
    getAllUsers
}


//Index
async function index (req, res){
    try{
        res.render('Home')
    } catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}


// Delete Form
async function unsubscribe (req, res){
    try {
        res.render('UnsubscribeForm')
    } catch (error) {
        res.status(400).json(err)
    }
}


//Delete User
async function deleteUser(req, res){
    let email = req.body.email
    let found
    // check if user exists
    User.find({email})
        .then((user) => {
            // explains no user found
            if(!user){
                found = false
                console.log('Not deleted')
                res.render('Unsubscribed', {found, email})
            } else {
                // delete existing user
                found = true
                User.findOneAndDelete({email})
                    .then(() => {
                        console.log('deleted')
                        res.render('Unsubscribed', {email, found})
                    })
            }
        })
        .catch((err) => {
            res.status(400).send(err)
        })
}


// Create User
async function createUser(req, res){
    let found
    // check if email exists
    User.findOne({email: req.body.email})
        .then((foundUser) => {
            // if it doesn't create subscriber
            if(!foundUser){
                User.create(req.body).then((createdUser) => {res.render('Home', {found: false, email: createdUser.email})})
            } else {
                res.render('Home', {found: true, email: foundUser.email})
            }
        })
        .catch((err) => {
            res.status(403).send(err)
        })
}


async function getAllUsers (req, res){
    try {
        const users = await User.find({})
        return users
    } catch (e) {
        console.log(e)
        return e
    }
}
