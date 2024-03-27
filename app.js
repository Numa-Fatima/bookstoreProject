require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const user_route = require('./routes/bookstore')
const auth_route = require('./routes/authRoutes'); 


const app = express()
const PORT = 3000

mongoose.connect('mongodb://localhost:27017/test').then(()=>{
    app.listen(PORT, console.log(`listening on port ${PORT}`))
}).catch(err => console.log(err)) // should be in spreate file. 


  
app.use(express.json())
app.use('/bookstore',user_route)
app.use('/auth', auth_route);


