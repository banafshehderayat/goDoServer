var Schema = {
	// list of all the users
	users: {
		id: {type: 'increments', nullable: false, primary: true},
		email: {type: 'string', maxlength: 255, nullable: false, unique: true},
		password: {type: 'string', maxlength: 127, nullable: false},
		token: {type: 'text', fieldtype: 'medium', nullable: false}
	},

	// state of their page when last logged in
	state: {
		id: {type: 'increments', nullable: false, primary: true},
		user_id: {type: 'integer', nullable: false, unsigned: true},
		category: {type: 'integer', nullable: true, unsigned: true},
		middle_bar: {type: 'integer', nullable: true, unsigned: true}
	},

	// a users categories
	categories: {
		id: {type: 'increments', nullable: false, primary: true},
		name: {type: 'string', maxlength: 63, nullable: false},
		user_id: {type: 'integer', nullable: false, unsigned: true}
	},

	// a users routines
	routines: {
		id: {type: 'increments', nullable: false, primary: true},
		name: {type: 'string', maxlength: 127, nullable: false},
		description: {type: 'text', fieldtype: 'medium', nullable: true},
		fixed_time: {type: 'boolean', nullable: false},
		has_goal: {type: 'boolean', nullable: false},
		user_id: {type: 'integer', nullable: false, unsigned: true},
		category_id: {type: 'integer', nullable: false, unsigned: true},
		goal_id: {type: 'integer', nullable: true, unsigned: true}
	},

	// the availibility for a routine if fixed
	fixed_available: {
		id: {type: 'increments', nullable: false, primary: true},
		routine_id: {type: 'integer', nullable: false, unsigned: true},
		// days stored as an in where mon=1, tues=2...sun=7
		days: {type: 'integer', nullable: true, unsigned: true},
		time: {type: 'time', nullable: true}
	},

	// the availibility for a routine if flexible
	flex_available: {
		id: {type: 'increments', nullable: false, primary: true},
		routine_id: {type: 'integer', nullable: false, unsigned: true},
		// the days are stored in an integer from 1-7 (for example Mon, Wed, Fri woud be 135)
		days: {type: 'integer', nullable: true, unsigned: true},
		length: {type: 'float', nullable: true}
	},

	// a routine's goal
	goals: {
		id: {type: 'increments', nullable: false, primary: true},
		routine_id: {type: 'integer', nullable: false, unsigned: true},
		number: {type: 'float', nullable: false},
		units: {type: 'string', maxlength: 127, nullable: true},
		cycle: {type: 'integer', nullable: true}
	},

	// a user's todos
	todos: {
		id: {type: 'increments', nullable: false, primary: true},
		name: {type: 'string', nullable: false},
		description: {type: 'string', maxlength: 255, nullable: true},
		set_time: {type: 'boolean', nullable: false},
		date: {type: 'dateTime', nullable: false},
		category_id: {type: 'integer', nullable: false, unsigned: true},
		user_id: {type: 'integer', nullable: false, unsigned: true}
	}
}



module.exports = Schema;