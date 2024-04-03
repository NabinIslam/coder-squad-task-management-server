auth
﻿

POST
sign up
http://localhost:3000/api/auth/signup
﻿

Query Params
Body
raw (json)
json
{
    "name": "body builder4",
    "email": "bodygh@gmailc.om",
    "password": "123456"
}
POST
sign in
http://localhost:3000/api/auth/signin
﻿

Body
raw (json)
json
{
    "email": "bodygh@gmailc.om",
    "password": "123456"
}
GET
sign out
http://localhost:3000/api/auth/signout
﻿

GET
user
http://localhost:3000/api/auth/user
﻿

Request Headers
Authorization
user
﻿

GET
get all users
http://localhost:3000/api/users
﻿

GET
get a user by email
http://localhost:3000/api/users/email/body4@gmailc.om
