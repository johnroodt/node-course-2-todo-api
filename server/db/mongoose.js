var mongoose = require('mongoose');

// Mongoose uses callbacks by default, but we want to use Promises.
// Only need to add this once in this file.
mongoose.Promise = global.Promise;
// Mongoose maintains connection and handles the asynchronicities
mongoose.connect('mongodb://localhost:27017/TodoApp'); 

module.exports = {mongoose};
/**
 * Shortened form of the following if you are using ES6 
 *  module.exports = {
        mongoose: mongoose
    };
 */