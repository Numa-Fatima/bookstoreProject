const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    email : String ,
    username : String,
    password : String,
    phone_number : Number,
    passwordResetToken: String,
    passwordResetExpires : Date

}) 

const userModel = mongoose.model('user',userSchema)

module.exports = userModel
