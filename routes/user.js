const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

// /
router.get('/', userController.index)
router.get('/unsubscribe', userController.unsubscribe)
router.delete('/confirmation', userController.deleteUser)
router.post('/user', userController.createUser)


module.exports = router