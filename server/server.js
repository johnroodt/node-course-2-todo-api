// LIBRARY IMPORTS
var express = require('express');
var bodyParser = require('body-parser');

//LOCAL IMPORTS
/** Server.js is responsible for our Routes */
// Using ES6 destructuring
var {mongoose} = require('./db/mongoose');
// Using destructuring, create vars of our models
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// SET UP APP
var app = express();
// GET MIDDLEWARE, pass to express. Body is stored by bodyParser
app.use(bodyParser.json());

// SET UP ROUTES (using POST routes)
// urls are key. here we using todos for todo's
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then( (doc) => {
        res.send(doc);
    }, (err) => {
        // See httpstatuses.com
        res.status(400).send(err);
    });
});

// START express app
app.listen(3000, () => {
    console.log('Started on port 3000');
});

// Export app using ES6 syntax
module.exports = {app};