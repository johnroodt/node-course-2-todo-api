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

    // deleteMany
    db.collection('Users').deleteMany({name: 'Johnny Redd'}).then((result) => {
        console.log(result);
    });

    // deleteOne...deletes the first one found that satisfies the filter 
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    /** findOneAndDelete...returns the data you've just deleted. 
     * This is useful in cases where you want the user to have the option to undo, &
     * having the data, you can just write it back into the DB */
    db.collection('Users').findOneAndDelete({_id: new ObjectID('597f1c3cde74be1207c5e27d')}).then((result) => {
        console.log(result);
    });

    //db.close();
});