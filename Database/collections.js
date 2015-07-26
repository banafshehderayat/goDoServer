var models = require('./models');
var Bookshelf = require('bookshelf')(models.knex);
var Users = Bookshelf.Collection.extend({
	model: models.User
});
exports.Users = Users;