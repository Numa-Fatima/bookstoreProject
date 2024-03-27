require('dotenv').config();
const express = require('express')
const connectDB = require('./db')
const user_route = require('./routes/userRoutes')
const auth_route = require('./routes/authRoutes'); 

const app = express()
const PORT = process.env.PORT

connectDB()

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)})

  
app.use(express.json())
app.use('/user',user_route)
app.use('/auth', auth_route);


