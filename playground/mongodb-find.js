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

    // db.collection('Todos').find({
    //     _id: new ObjectID('597f2a6c35567dbc3a1ccef1')
    // }).toArray().then((docs) => {
    //     console.log('Todos:');
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: 'Johnny Redd'}).toArray().then((docs) => {
        console.log('User docs belonging to Johnny Redd');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to find users', err);
    });

    //db.close();
});