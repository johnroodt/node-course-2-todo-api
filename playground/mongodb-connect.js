// Looking for Mongo client
//const MongoClient = require('mongodb').MongoClient;
// Use ES6 destructuring.
const {MongoClient, ObjectID} = require('mongodb');

// Params (URL, callback)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    // add some data
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         // use return to close/end the process??
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // Insert new doc into Users (name, age, location)
    // db.collection('Users').insertOne({
    //     name: 'Johnny Redd',
    //     age: 99,
    //     location: "Cape Town"
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert new user', err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    //     //Pull the time the document was created from the first 4-bytes of the _id

    // });


    db.close();
});