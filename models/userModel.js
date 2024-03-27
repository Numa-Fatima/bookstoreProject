const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    email : String ,
    username : String,
    password : String,
    phone_number : Number

}) 

const userModel = mongoose.model('user',userSchema)

module.exports = userModel
