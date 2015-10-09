'use strict'
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const config = require('./config')

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  username: String
})

userSchema.pre('save', function(next) {
  var user = this
  if (!user.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch)
  })
}

const User = mongoose.model('User', userSchema)

function connect() {
	mongoose.connect(config.MONGO_URI)
	mongoose.connection.on('error', function(err) {
		console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red)
	})
}

module.exports = {
	User: User,
	connect: connect
}