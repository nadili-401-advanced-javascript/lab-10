'use strict';

// == EXTERNAL RESOURCES ===============================================

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// == INTERNAL RESOURCES ===============================================

const errorHandler = require('./middleware/error.js');
const notFound = require('./middleware/404.js');
const authRouter = require('./routes/auth-router.js');
const bookRouter = require('./routes/book-router.js');
const app = express();

// == APPLICATION MIDDLEWARE ============================================

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// == ROUTES ===========================================================

// TODO Swagger Comment
/**
 * send Homepage string to browser when client hit root rout 
 * @route GET /
 */

app.get('/', (req, res, next) => {
  res.send('Homepage');
});

// Each app.use(middleware) is called every time a request is sent to the server.
// The middleware function is executed when the base path matches. In our case we're not specifying the request URL, so it
// gets executed every time no matter what URL's been hit.

// execute code in './routes/auth-router.js'
app.use(authRouter);

// execute code in './routes/book-router.js'
app.use(bookRouter);

// execute code in './middleware/404.js'
app.use(notFound);

// execute code in './middleware/error.js' 
app.use(errorHandler);

// == EXPORTS ===========================================================

module.exports = {
  server: app,

  start: port => {
    const PORT = process.env.PORT;

    // server is now listens for requesrs on PORT specified in .env variable
    app.listen(PORT, () => {
      console.log(`Server Up on ${PORT}`);
    });

    // Mongoos configs 
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    };

    const path = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/app';
    mongoose.connect(path, options);
  }
};
