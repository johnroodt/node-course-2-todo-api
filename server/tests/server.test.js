const expect = require('expect');
const request = require('supertest');
// Mocha and nodemon don't need to be required
const {ObjectID} = require('mongodb');

//load in local files - use ES6 destructuring
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

/** Use describe to partition routes and add test cases.
 * Note, in the POST test below we assume DB starts off empty. 
 * To do that, we set up "beforeEach" to clear the DB.
 * But we also need to seed the DB for the GET tests.
 */
//set up dummy todos
const todos = [{
    _id: new ObjectID(),
    text: "First test todo"
}, {
    _id: new ObjectID(),
    text: "Second test todo"
}];
// Now insert the dummy todos into the beforeEach
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create new todo', (done) => {
        var text = 'Test todo text';
        // Make test via supertest
        request(app)
        .post('/todos')
        .send({text})  //ES6 syntax.. text: text
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })  // do error handling in the end call...not just passing done here
        .end((err, res) => {
            if(err) {
                return done(err); // return just stops the function execution
            }
            // If no error, check DB to ensure our new Todo was added. Match test text
            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
            // now add scripts into package.json to run it
        })
    });

    /**
     * Here's a test to ensure a Todo is not created when we send bad data
     */
    it('should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err) {
                return done(err);
            }
            //We adding two documents in our test...so length should be 2
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e))
        });
    });
});
/** NOTE... where .catch(..) is set above, took me by surprise. 
 * I thought it would be one line down.
 * Hopefully I will laugh at this statement soon
 */

 // See that we get the two documents we add in the test above. New test section described
 describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2)
        })
        .end(done);
    });
 });

 describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo not found',(done) => {
        var hexID = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexID}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object IDs', (done) => {
        var invalidID = '1234567890';
        request(app)
        .get(`/todos/${invalidID}`)
        .expect(404)
        .end(done);
    });

 });