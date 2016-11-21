const express = require('express')
const router = express.Router()

const chalk = require('chalk')

const models = require('../models')
const Item = models.Item
const User = models.User

// const itemsRouter = require('./items.js')
// const userRouter = require('./users.js')

router.get('/', function(req, res, next){
	Item.findAll({include: [User]})
	.then(function(items){
		res.render('index', {
			items: items
		})
	})
	.catch(next)
})

// router.use('/item', itemsRouter)
// router.use('/user', userRouter)

module.exports = router