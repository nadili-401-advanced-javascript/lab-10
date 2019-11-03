# LAB - 10

## Express

### Author: Nadya Ilinskaya/Seattle-js-401n14

### Links and Resources
* [submission PR](https://github.com/nadili-401-advanced-javascript/lab-10/pull/1)
* [travis](https://travis-ci.com/nadili-401-advanced-javascript/lab-10)
* [heroku](https://nadili-lab-10.herokuapp.com/)


### Modules
#### `server.js`
#### `model.js`
#### `users-model.js`
#### `users-schema.js`
#### `auth-router.js`
#### `book-router.js`
#### `404.js`
#### `error.js`

#### Lab Quesions
* Currently, the client is just sending us an object containing the username and password to us, which is why we can just pass along (req.body). What is a better way to do this? 
   * The client should encrypt the password using basic auth.

* What are the pros and cons of setting res.cookie?
   * The use of cookies places trust on the client side. Not all browsers support cookies and users have the option to enable or disable cookies. They do not require server resources. Cookies can persist for long periods of time (days, months, years). Easily manageable. 

* What does .isModified do and why do we use it?
   * Checks if a password is entered. If so, hash the password using bcrypt

### Setup

#### Running the app
* config .env variables:
    * PORT
    * MONGODB_URI
    * JWT_SECRET
* Make sure use have local version of *app* mongo db with a collection named *users*.
The users collection should have three unique users. Here is the data for these users (note that in the database, the passwords are stored as hashes instead of plain-text):
```
{
    _id: "5db89b394eecc5418a3bf3c1",
    role: "admin",
    username: "sarah",
    password: "sarahpassword",
    email : "sarah@email.com"
}
{
    _id: "5db89b4e4eecc5418a3bf3c2",
    role: "editor",
    username: "bill",
    password: "billpassword",
    email: "bill@email.com"
}
{
    _id: "5db89b624eecc5418a3bf3c3",
    role: "user",
    username: "rene",
    password: "renepassword",
    email : "rene@email.com"
} 
```
* start a MongoDB instance with the data from your local mongo db folder: `mongod --dbpath=./data`
* `node index.js`
* http://localhost:3000

  
#### Tests
* Unit Tests: 'npm test'
* Lint Tests: 'npm run lint' 


#### UML
![ UML for the 'callbacks' part of the application ](/assets/lab-10-uml.jpg)