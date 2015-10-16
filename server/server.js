'use strict'
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const app = express()
const routes = require('./routes')

const Model = require('./model')

Model.connect();

app.set('port', process.env.PORT || 8080)
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../app')))
app.use('/api', routes)

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'))
})