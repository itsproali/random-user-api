# Random User Api : [Live Server](https://random-user-api-daq3.onrender.com)

## This is a server to getting random user from a json file. I have implemented CRUD operations using file system and ExpressJS.

<br>

## Features:

### GET /user/random A random user

- Get a random user from the .json file

<br>

### GET /user/all A list of random users

- Get all the users from the .json file
- Limit the number of users using query parameter(s)

<br>

### POST /user/save Save a random user

- Save a user in the .json file
- validate the body and check if all the required properties are present in the body.

<br>

### PATCH /user/update Update a random user

- Update a user's information in the .json file using its id
- validate the user id

<br>

### PATCH /user/bulk-update update multiple users

- Update multiple users' information in the .json file
- Take an array of user ids and assign it to the body.
- validate the body.

<br>

### DELETE /user/ delete

- Delete a user from the .json file using its id
- validate the user id
