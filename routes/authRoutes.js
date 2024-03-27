const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()


router.post('/login', authController.loginUser)
router.post('/register', authController.createUser)
router.post('/forgetPassword', authController.forgetPassword)
router.post('/resetPassword', authController.resetPassword)


module.exports = router;
