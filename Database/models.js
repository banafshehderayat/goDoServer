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

	availibility: function() {
		if (this.get('set_time')){
			console.log('set_time');
		} else {
			console.log('flex-time');
		}
	}
});
exports.Routine = Routine;

exports.Bookshelf = Bookshelf;