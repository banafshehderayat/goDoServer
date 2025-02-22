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

Default URL that goes before every path is: http://localhost:8080/

*Anything italicized is an optional field*

Path | HTTP Method| Input Data | Output Data | Status Success | Status Error
-----|------------|------------|-------------|----------------|-------------
/signup | POST | {email: String , password: String} | {user: JSON , token: String} | {201} | {400 , 500}
/login | POST | {email: String , password: String} | {user : JSON , token: String} | {200} | {400 , 403}
/category | GET | {} | {categories: JSON} | {200} | {403 , 500}
/category | POST | {name: String} | {} |  {201} | {403 , 404 , 500}
/category | PUT | {oldName: String, newName: String} | {} | {200} | {403 , 500}
/categrory | DELETE | {name: String} | {} |  {200} | {403 , 404 , 500}
/all/todos | GET | {} | {todos: JSON} | {200} | {403 , 404, 500}
/:category/todos | GET | {} | {todos: JSON} | {200} | {403 , 404, 500}
/:category/todos | POST | {name: String , *description: String*, set_time: Boolean, date: String as **yyyy-mm-dd hh:mm:ss+/-<time zone>**} | {} | {201} | {403 ,  404 , 500}
/:category/todos | PUT | {oldName: String , newName: String , *description: String* , *set_time: Boolean* , *date: String as yyyy-mm-dd hh:mm:ss+/-<time zone>*} | {} | {200} | {403 , 404, 500}
/:category/todos | DELETE | {name: String} | {} | {200} | {403, 404, 500}
/all/routines | GET | {} | {routines: JSON} | {200} | {403, 404, 500}
/:category/routines | GET | {} | {routines: JSON} | {200} | {403 , 404, 500}
/:category/routines | POST | {name: String , *description: String*, has_goal: Boolean, fixed_time: Boolean, days: Integer (where 1 is Mon 2 is Tues..., if fixed_time { time: String as **hh:mm:ss** } else { length: Float }, if has_goal { number: Float, units: String, Cycle: Integer (in days) }} | {} | {201} | {403 ,  404 , 500}
/:category/routines | PUT | {oldName: String , newName: String , *description: String, has_goal: Boolean, fixed_time: Boolean, days: Integer (where 1 is Mon 2 is Tues..., if fixed_time { time: String as **hh:mm:ss** } else { length: Float }, if has_goal { number: Float, units: String, Cycle: Integer (in days) }*} | {} | {200} | {403 , 404, 500}
/:category/routines | DELETE | {name: String} | {} | {200} | {403, 404, 500}

Note: when updating both newName and oldName are required. To keep the same name, make newName == oldName

Status # | Meaning
---------|--------
2**  | Success
200 | Ok
201 | Created
3** | Redirection
4** | Client Error
400 | Bad Request
401 | Unauthorized
403 | Forbidden
404 | Not Found
418 | Im a teapot
5** | Server Error
500 | Internal Server Error

