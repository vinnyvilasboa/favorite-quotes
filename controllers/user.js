const express = require('express')
const User = require('../models/user')

const router = express.Router()



//Index
router.get('/', (req, res) =>{
    res.render('../views/Home')
})


//Delete User
router.delete('/user', (req, res) => {
    User.findOneAndDelete({email: req.body})
        .then(() => {
            res.render('Home')
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