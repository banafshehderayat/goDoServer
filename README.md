API v0.1

## AUTHENTICATION

1. Both signing up and login in return a user's token
2. This token is used to identify which user's information is requested
3. Attemping to access a user's information without the correct token will result in an error

## ROUTES ##

Every call returns a json object with the following format:

> {
>	error: Bool,
>	message: String,
>	data (optional): JSON,
>	token(optional): String
> }

With the exception of tokens (which will be returned under the token tag),
all outputs will be returned under the data tag

*Anything italicized is an optional feild*

Path | HTTP Method| Input | Output 
-----|------------|-------|-------
/signup | POST | {email: String , password: String} | {user: JSON , token: String}
/login | POST | {email: String , password: String} | {user : JSON , token: String}
/category | GET | {} | {categories: JSON}
/category | POST | {name: String} | {}
/category | PUT | {oldName: String, newName: String} | {}
/categrory | DELETE | {name: String} | {}
/all/todos | GET | {} | {todos: JSON}
/:category/todos | POST | {name: String , *description: String*, set_time: Boolean, date: String as **yyyy-mm-dd hh:mm:ss+/-<time zone>**} | {}
/:category/todos | GET | {} | {todos: JSON}
/:category/todos | PUT | {oldName: String , *newName: String* , *description: String* , *set_time: Boolean* , *date: String as yyyy-mm-dd hh:mm:ss+/-<time zone>*} | {}
/:category/todos | DELETE | {name: String} | {}

Extra Notes: 
 * :category can be any of the user's categories (must already be saved in db) or 'all'.
	Currently only the get and post request is affected by :category (affects todos in the appropriate scope) 
	- Will be changed so everything is in correct scope
