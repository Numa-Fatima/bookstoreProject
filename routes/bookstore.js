const express = require('express')
const router = express.Router();

const userController = require('../controllers/bookstore')
router.get('/',userController.getAllUsers)
router.get('/:username',userController.getUserByUsername )
router.post('/login', userController.loginUser);
router.post('/',userController.createUser )
router.put('/:email',userController.updateUserByEmail)

module.exports = router