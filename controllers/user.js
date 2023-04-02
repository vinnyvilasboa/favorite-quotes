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

router.get('/user', (req, res) => {
    User.findOneAndDelete({email: req.query.email})
    .then(() => {
        console.log('deleted')
        res.redirect('https://psych-bite.herokuapp.com')
        // res.render('Home')
    })
    .catch((err) => {
        res.status(400).send(err)
    })
    console.log(req)
    console.log(req.body)
    console.log(req.query.email)
    res.redirect('Home')
    // User.findOne({email: req.body})
    //     .then((user) => {
    //         console.log(user)
    //     })
    //     .catch((err) => {
    //         console.log('Error ', err)
    //     })
})


//Delete User
router.delete('/user', (req, res) => {
    console.log(req)
    console.log(req.body)
    console.log(req.query.email)
    User.findOneAndDelete({email: req.query.email})
        .then(() => {
            console.log('deleted')
            res.redirect('https://psych-bite.herokuapp.com')
            // res.render('Home')
        })
        .catch((err) => {
            res.status(400).send(err)
        })
})


// Create User
router.post('/user', (req, res) => {
    User.create(req.body)
        .then((user) => {
            res.render('Home')
        })
        .catch((err) => {
            res.status(403).send(err)
        })
})



module.exports = router