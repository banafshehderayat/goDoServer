var knex = require('knex')({
	client: 'pg',
	connection: "postgres://GoDoAdmin:cuphelmetwrappersilicon@127.0.0.1:5432/GoDo"
});
exports.knex = knex;

var Bookshelf = require('bookshelf')(knex);

// User model
var User = Bookshelf.Model.extend({
	tableName: 'users',

	categories: function () {
		return this.hasMany(Category);
	},

	routines: function () {
		return this.hasMany(Routine);
	},

	todos: function() {
		return this.hasMany(Todo);
	}
});
exports.User = User;

var Category = Bookshelf.Model.extend({
	tableName: 'categories',

	routines: function () {
		return this.hasMany(Routine);
	},

	todos: function() {
		return this.hasMany(Todo);
	}
});
exports.Category = Category;

var Todo = Bookshelf.Model.extend({
	tableName: 'todos'
});
exports.Todo = Todo;

var Routine = Bookshelf.Model.extend({
	tableName: 'routines',

	fixed: function() {
		return this.hasMany(Fixed);
	},

	flex: function() {
		return this.hasMany(Flex);
	},

	goal: function() {
		return this.hasOne(Goal);
	}
});
exports.Routine = Routine;

var Goal = Bookshelf.Model.extend({
	tableName: 'goals',

	routine: function() {
		return this.hasOne(Routine);
	}
})
exports.Goal = Goal;

var Fixed = Bookshelf.Model.extend({
	tableName: 'fixed_available'
});

exports.Fixed = Fixed

var Flex = Bookshelf.Model.extend({
	tableName: 'flex_available'
});

exports.Flex = Flex

exports.Bookshelf = Bookshelf;