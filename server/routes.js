'use strict'
const Express = require('express')
const Router = Express.Router()
const Model = require('./model')
const User = Model.User;

Router.get('/status', function (req, res) {
  res.send({
		status: 'ok'
	})
})

Router.get('/me', function (req, res) {
 res.send({
		username: 'test user',
		profile: 'my profile lorem ipsum and some other pipsum'
	})
})

Router.post('/auth/signup', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, existingUser) {
    if (existingUser) {
      return res.status(409).send({ message: 'Email is already taken' });
    }
    var user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    user.save(function(err, result) {
      if (err) {
        res.status(500).send({ message: err.message });
      }
      //res.send({ token: createJWT(user) })
      res.send({ token: 'asdzxcasd123weqweasd' })
    });
  });
});

module.exports = Router