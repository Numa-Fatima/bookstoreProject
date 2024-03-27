const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router();

router.get('/',userController.getAllUsers)
router.get('/:username',userController.getUserByUsername )
router.put('/:email',userController.updateUserByEmail)

module.exports = router