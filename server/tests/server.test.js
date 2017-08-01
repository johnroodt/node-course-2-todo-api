const expect = require('expect');
const request = require('supertest');
// Mocha and nodemon don't need to be required

//load in local files - use ES6 destructuring
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

/** Use describe to partition routes and add test cases.
 * Note, below we assume DB starts off empty. To do that, we set up "beforeEach" to clear the DB
 */
beforeEach(() => {
    Todo.remove({}).then(() => done());
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
            // If no error, check DB to ensure our new Todo was added
            Todo.find().then((todos) => {
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
            Todo.find().then((todos) => {
                expect(todos.length).toBe(0);
                done();
            }).catch((e) => done(e))
        });
    });
});
/** NOTE... where .catch(..) is set above, took me by surprise. 
 * I thought it would be one line down.
 * Hopefully I will laugh at this statement soon
 */