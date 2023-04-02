const express = require('express')
const User = require('../models/user')

const router = express.Router()



//Index
router.get('/', (req, res) =>{
    try{
        res.render('Home')
    } catch(err){
        console.log(err)
        res.status(400).json(err)
    }
})


// Delete from email
router.get('/user', (req, res) => {
    let deleteEmail = req.query.email
    User.findOneAndDelete({email: deleteEmail})
    .then(() => {
        console.log('deleted ', deleteEmail)
        res.render('Unsubscribed', {email: deleteEmail})
    })
    .catch((err) => {
        res.status(400).send(err)
    })
})


//Delete User
router.delete('/user', (req, res) => {
    User.findOneAndDelete({email: req.query.email})
        .then(() => {
            console.log('deleted')
            res.redirect('/')
        })
        .catch((err) => {
            res.status(400).send(err)
        })
})


// Create User
router.post('/user', (req, res) => {
    User.create(req.body)
        .then((user) => {
            res.redirect('/')
        })
        .catch((err) => {
            res.status(403).send(err)
        })
})



module.exports = router