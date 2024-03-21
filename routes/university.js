const express = require('express')

const router = express.Router();

const universityController = require('../controllers/university')
router.get('/',universityController.getAllUniversities)
router.get('/:id',universityController.getUniversityById )
router.post('/',universityController.createUniversity )
router.put('/:id',universityController.updateUniversityById)
router.delete('/:id',universityController.deleteUniversityById)

module.exports = router