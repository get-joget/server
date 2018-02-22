require('dotenv').config()
const express    = require('express')
const logger     = require('morgan')
const bodyParser = require('body-parser')
const index      = require('./routes/index')
const users      = require('./routes/users')
const cors       = require('cors')
const app        = express()
const firebase   = require("firebase")

//======================================================

const config = {
    apiKey: "AIzaSyAZDct8zsXkFEYkt6LtxTHNHVllK_ap_1A",
    authDomain: "learning-5708d.firebaseapp.com",
    databaseURL: "https://learning-5708d.firebaseio.com",
    projectId: "learning-5708d",
    storageBucket: "learning-5708d.appspot.com",
    messagingSenderId: "303656755232"
}

firebase.initializeApp(config)

//=======================================================

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/users', users)

app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.send('error')
})

module.exports = app
