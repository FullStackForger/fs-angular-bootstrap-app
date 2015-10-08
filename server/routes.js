'use strict'
const express = require('express')
const router = express.Router()

router.get('/status', function (req, res) {
  res.send({
		status: 'ok'
	})
})

router.get('/me', function (req, res) {
 res.send({
		username: 'test user',
		profile: 'my profile lorem ipsum and some other pipsum'
	})
})

module.exports = router