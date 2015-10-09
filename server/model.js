'use strict'
const Bcrypt = require('bcryptjs')
const Mongoose = require('Mongoose')

const userSchema = new Mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  username: String
})

userSchema.pre('save', function(next) {
  var user = this
  if (!user.isModified('password')) {
    return next()
  }
  Bcrypt.genSalt(10, function(err, salt) {
    Bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function(password, done) {
  Bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch)
  })
}

const User = Mongoose.model('User', userSchema)

function connect() {
	Mongoose.connect('localhost')
	Mongoose.connection.on('error', function(err) {
		console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red)
	})
}

module.exports = {
	User: User,
	connect: connect
}