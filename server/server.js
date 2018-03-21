const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const userRouter = require('./user')
const excelRouter = require('./excel')

app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user',userRouter)
app.use('/user',excelRouter)

app.listen('8989',() => {
  console.log('server started ,at port 8989')
})
