const express = require('express')

const router = express.Router();


const university_controller = require('../controllers/university')
router.get('/',university_controller.getAll)
router.get('/:id',university_controller.getById )
router.post('/',university_controller.create )
router.put('/:id',university_controller.update )
router.delete('/:id',university_controller.remove)

module.exports = router