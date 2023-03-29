const express = require('express')
const User = require('../models/user')

const router = express.Router()



//Index
router.get('/', (req, res) =>{
    res.render('Home')
})


//Delete User
router.delete('/user', (req, res) => {
    User.findOneAndDelete({email: req.body}, (err) => {
        if(err){
            res.status(400).send(err)
        } else {
            res.render('Home')
        }
    })
})


// Create User
router.post('/user', (req, res) => {
    User.create(req.body, (err, createdUser) => {
        if(err){
            res.status(403).send(err)
        } else {
            res.render('Home')
        }
    })
})



module.exports = router