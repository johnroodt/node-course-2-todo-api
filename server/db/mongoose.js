var mongoose = require('mongoose');

// Mongoose uses callbacks by default, but we want to use Promises.
// Only need to add this once in this file.
mongoose.Promise = global.Promise;
// Mongoose maintains connection and handles the asynchronicities
/**
 * To set up Heroku for a live server (here using Heroku)
 */
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
//mongoose.connect(process.env.MONGODB_URI);
// localhost only during initial dev
mongoose.connect('mongodb://localhost:27017/TodoApp'); 

module.exports = {mongoose};
/**
 * Shortened form of the following if you are using ES6 
 *  module.exports = {
        mongoose: mongoose
    };
 */