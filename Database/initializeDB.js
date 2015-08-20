var pg = require('pg');
var Schema = require('./Schema');
var promise = require('bluebird');
var models = require('./models');
var _ = require('lodash');
var Async = require('async');

function createTable(tableName) {
  return models.knex.schema.createTable(tableName, function (table) {
    var column;
    var columnKeys = _.keys(Schema[tableName]);
    _.each(columnKeys, function (key) {
      if (Schema[tableName][key].type === 'text' && Schema[tableName][key].hasOwnProperty('fieldtype')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].fieldtype);
      }
      else if (Schema[tableName][key].type === 'string' && Schema[tableName][key].hasOwnProperty('maxlength')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].maxlength);
      }
      else {
        column = table[Schema[tableName][key].type](key);
      }
      if (Schema[tableName][key].hasOwnProperty('nullable') && Schema[tableName][key].nullable === true) {
        column.nullable();
      }
      else {
        column.notNullable();
      }
      if (Schema[tableName][key].hasOwnProperty('primary') && Schema[tableName][key].primary === true) {
        column.primary();
      }
      if (Schema[tableName][key].hasOwnProperty('unique') && Schema[tableName][key].unique) {
        column.unique();
      }
      if (Schema[tableName][key].hasOwnProperty('unsigned') && Schema[tableName][key].unsigned) {
        column.unsigned();
      }
      if (Schema[tableName][key].hasOwnProperty('references')) {
        column.references(Schema[tableName][key].references);
      }
      if (Schema[tableName][key].hasOwnProperty('defaultTo')) {
        column.defaultTo(Schema[tableName][key].defaultTo);
      }
    });
  });
}


var doesTableExist = function (tableName) {
	exists = models.knex.schema.hasTable(tableName);
	return exists
}

var initDb = function () {
	var calls = [];
	var tableNames = _.keys(Schema);

	tableNames.forEach(function (tableName) {

		var f = function (callback) {
			doesTableExist(tableName)
			.then(function (exists) {
				// ALERT - due to an unknown bug, hasTable('routines') always returns true
				if (!exists || tableName == 'routines') {
					console.log("Creating database table " + tableName + "...");

					createTable(tableName)
					.then(function (result) {
						console.log("---> Created database table " + tableName);
						callback(null, result);
					})
					.catch(function (err) {
						console.log("Error creating " + tableName + " table " + err);
						callback(err, null);
					});

				} else {
					console.log("*Table " + tableName + " already exists");
					callback(null, exists);
				}
			})
			.catch(function (error) {
				console.log("Error creating " + tableName + " table " + error);
				callback(error, null)
			});
		};

		calls.push(f);
	});

	Async.series(calls, function (err, result) {
		if (!err) {
			console.log("Finished initialising database table");
			process.exit(0);
		} else {
			console.log("Error initialising database table: " + err);
			process.exit(1);
		}
	});
};

initDb();