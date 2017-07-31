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

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('597f43838ee2901939816982')
    }, {
        $set: {
            name: 'Johnno'
        }, 
        $inc: {
            age: 1
        }
    }, {
        returnOrginal: false
    }).then((result) => {
        console.log(result);
    });

    //db.close();
});