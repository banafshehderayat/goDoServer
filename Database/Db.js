var pg = require('pg');
var knex = require('knex')({
	client: 'pg',
	connection: {
		host		: '127.0.0.1',
		user		: 'GoDoAdmin',
		password	: 'cuphelmetwrappersilicon',
		database	: 'GoDo',
		charset		: 'utf8'
	}
});

var Schema = require('./Schema');
var promise = require('bluebird');
var _ = require('lodash');

function createTable(tableName) {

	return knex.schema.createTable(tableName, function(table) {

		var column;
		var columnKeys = _.Keys(Schema[tableName]);
	})

}
console.log("END");