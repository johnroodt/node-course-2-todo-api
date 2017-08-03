const{ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Removes all records
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Returns first document that meets the criteria & returns the data
// Todo.findOneAndRemove({_id: '5981b82c8cbbd26083e8bcd1'}).then((todo) => {
//     console.log(todo);
// });

Todo.findByIdAndRemove(new ObjectID('5981e01e94501c057f5b7827')).then((todo) =>{
    console.log(todo);
});