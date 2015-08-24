API v0.1

## AUTHENTICATION ##

1. Both signing up and login in return a user's token
2. This token is used to identify which user's information is requested
3. Attemping to access a user's information without the correct token will result in an error

## ROUTES ##

Every call returns a json object with the following format:
{
	error: Bool,
	message: String,
	data (optional): JSON,
	token(optional): String
}

With the exception of tokens (which will be returned under the token tag),
all outputs will be returned under the data tag

Anything with a * means that it is optional


1. '/signup'

Create a new user. Returns that user's token

Create:
	inputs:
		email: String
		password: String

	outputs:
		user: JSON
		token: String

2. '/login'

Get a user's token

Create:
	inputs:
		email: String
		password: String

	outputs:
		user: JSON
		token: String

3. '/category'

A User's category information

Create:
	inputs:
		name: String

Read:
	ouputs:
		list of all the user's categories: JSON

Update:
	inputs:
		oldName: String
		newName: String

Delete:
	inputs:
		name: String

4. '/:category/todos'

A User's todo information

:category can be any of the user's categories (must already be saved in db) or 'all'.
Currently only the get and post request is affected by :category (affects todos in the appropriate scope) 
- Will be changed so everything is in correct scope

Create:
	inputs:
		name: String
		description*: String
		set_time: Boolean
		date: String formatted as 'yyyy-mm-dd hh:mm:ss+/-<time zone>' e.g. '1995-02-26 09:25:26.056+09'

Read:
	ouputs:
		list the user's todos (within scope): JSON

Update:
	inputs:
		oldName: String
		newName*: String
		description*: String
		set_time*: Boolean
		date*: String formatted as 'yyyy-mm-dd hh:mm:ss+/-<time zone>' e.g. '1995-02-26 09:25:26.056+09'

Delete:
	inputs:
		name: String
