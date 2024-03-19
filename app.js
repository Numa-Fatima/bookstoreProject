const express = require('express')
const app = express()

app.use(express.json())

const university_route = require('./routes/university')

app.use('/university',university_route)

app.listen(3300, console.log('listening on port 3000'))
