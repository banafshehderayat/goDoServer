var Schema = {
	users: {
		id: {type: 'increments', nullable: false, primary: true},
		email: {type: 'string', maxlength: 254, nullable: false, unique: true},
		password: {type: 'string', maxlength: 64, nullable: false}
	}
}

module.exports = Schema;