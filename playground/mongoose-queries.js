const{ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5980449debb3eb075fca9ada';

// if(!ObjectID.isValid(id)) {
//     console.log('ID not valid: ', id);
// }

// mongoose will create the ObjectID
//Sends back an array
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos: ', todos)
// });

// Sends back the doc
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo: ', todo)
// });

// Best one to use if you're actually searching by _id
// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('ID not found');
//     }
//     console.log('Todo by id: ', todo)
// }).catch( (e) => console.log(e) );

// Validate an _id

User.findById(id).then( (user) => {
    if(!user) {
        return console.log('User not found');
    }
    console.log('User is: ', user);
}).catch((e) => console.log(e));