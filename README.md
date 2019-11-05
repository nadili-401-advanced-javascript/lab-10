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

#### Quesions
*  Currently, the client is just sending us an object containing the username and password to us, which is why we can just pass along (req.body). What is a better way to do this?
   * Basic access authentication would be a better way: In basic HTTP authentication, a request contains a header field in the form of Authorization: Basic <credentials>, where credentials is the base64 encoding of id and password joined by a single colon :.

* What are the pros and cons of setting res.cookie?
    * We're storing token in cookie so that user doesn't need to provide his credentials again to navigate through the website. Not sure about down-side in this particular case. 
   
* What does .isModified do and why do we use it?
   * .isModified is mangoos method to check if record was modified. We're checking it to see if we need to ecrypt (hash) it.  

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