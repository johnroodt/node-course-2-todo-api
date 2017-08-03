// LIBRARY IMPORTS
var express = require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');

//LOCAL IMPORTS
/** Server.js is responsible for our Routes */
// Using ES6 destructuring
var {mongoose} = require('./db/mongoose');
// Using destructuring, create vars of our models
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// SET UP APP
var app = express();
// Set up for Heroku (default to 3000 if using localhost)
const port = process.env.PORT || 3000;


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

// How to fetch variables passed in via the url
// GET /todos/1223423 (the id)
// use it to get a find by id
// here we specify the url parameter starting with the ":". it will be attached to the request
// object. Send back successful record inside {} so that you have more flexibility to add other properties
app.get('/users/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send({});
    }
    // todo 59807c94e8778f1703c8b644   ... user 5980449debb3eb075fca9ada
    User.findById(id).then((user) => {
        if(!user) {
            res.status(404).send({});
        }
        return res.status(200).send({user});
    }).catch((e) => {
        res.status(400).send({});
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send({});
    }
    // todo 59807c94e8778f1703c8b644   ... user 5980449debb3eb075fca9ada
    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

// GET all todos. Use ES6 shortcut in the res.send(..) so you can add other custom items
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

// Delete Routes
app.delete('todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send({});
    }
    // remove todo by id (see mongoose remove)
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

// START express app -- using port variable for Heroku
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

// Export app using ES6 syntax
module.exports = {app};