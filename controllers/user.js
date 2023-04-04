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


// Delete Form
router.get('/unsubscribe', (req, res) => {
    try {
        res.render('UnsubscribeForm')
    } catch (error) {
        res.status(400).json(err)
    }
})


//Delete User
router.delete('/confirmation', (req, res) => {
    let email = req.body.email
    User.findOneAndDelete({email})
        .then(() => {
            console.log('deleted')
            res.render('Unsubscribed', {email})
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