var Sequelize = require('sequelize')
var todoDb = new Sequelize('postgres://localhost:5432/todoDb')

let itemSchema = {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	notes: {
		type: Sequelize.TEXT
	},
	complete: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
}

let itemConfig = {}

let Item = todoDb.define('item', itemSchema, itemConfig)


let userSchema = {
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true
		}
	},
	firstName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false
	}
}

let userConfig = {
	getterMethods: {
		fullName: function(){
			return this.firstName + " " + this.lastName
		}
	}
}

let User = todoDb.define('user', userSchema, userConfig)


User.hasMany(Item)
Item.belongsTo(User)


module.exports = {
	Item: Item,
	User: User,
	todoDb: todoDb
}