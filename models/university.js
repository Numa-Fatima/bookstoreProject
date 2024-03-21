const mongoose = require('mongoose')


const universitySchema = mongoose.Schema({
    name_ar : String ,
    name_en : String,
    region_ar : String,
    region_en : String,
    semester_type : String,
    programs : [
        {
            name_ar : String,
            name_en : String
        }
    ]

}) 

const universityModel = mongoose.model('university',universitySchema)

module.exports = universityModel
