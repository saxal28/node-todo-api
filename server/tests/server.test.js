var expect        = require("expect");
var request       = require("supertest");
const { app }     = require("./../server");
const { Todo }    = require("./../models/todo");
const { ObjectID }= require("mongodb");

const todos = [
  {text: "first test todo", _id: new ObjectID(), completed:false},
  {text: "second test todo", _id: new ObjectID(), completed: true, completedAt: 33}
]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
})

describe("POST /todos", () => {
  it("should create a new todo", (done) => {
      var text = "Test todo test..."

      request(app)
        .post("/todos")
        .send({text})
        .expect(200)
        .expect((res)=> {
          expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
          if(err) {
            return done(err)
          }

          Todo.find({text}).then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch(e => done(e));
        });
  });

  it("should not create todo with invalid body data", done => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err)
        }

        Todo.find().then(todos => {
          expect(todos.length).toBe(2);
          done();
        }).catch(e => done(e))
      })
  })
});

describe("GET /todos", () => {
  it('should get all todos', done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done)
  })
})

describe("GET /todos/:id", () => {
  it("should return todo doc", (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done)
  })

  it("should return a 404 if todo not found", done => {
    var id = new ObjectID().toHexString();
    //make new objectID so it fails
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
    // make sure you get a 404 back
    .end(done)
  })

  it("should return 404 for non object ids", done => {
    var id = 123
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
    .end(done)
  })
})

describe("DELETE /todos/:id", () => {
  it("should remove a todo", done => {
    var hexID = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.result._id).toBe(hexID)
      })
      .end(((err, res)=> {
        if(err) {
          return done(err);
        }

        Todo.findById(hexID).then(todo => {
          expect(todo).toNotExist();
          done();
        }).catch(e => done(e));
      }))
  });

  it("should return 404 if todo not found", (done) => {
    var id = new ObjectID().toHexString();
    //make new objectID so it fails
    request(app)
      .delete(`/todos/${id}`)
      .expect(400)
    // make sure you get a 404 back
    .end(done)
  })

  it('should return 404 if ObjectID is invalid', (done) => {
      var id = 123
      request(app)
        .delete(`/todos/${id}`)
        .expect(404)
      .end(done)
    })
})

describe("PATCH /todos/:id", () => {
  it("should update the todo", (done) => {
    //grab id of first item
    var id = todos[0]._id.toHexString();
    var originalText = todos[0].text;

    //update the text, set completed to true
    request(app)
      .patch(`/todos/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(originalText)
        expect(res.body.todo.completed).toBe(false)
      })
      .end((err, res) => {
        if(err) {
          return done(err)
        }

        Todo.findByIdAndUpdate(id,{
          $set: {
            text:"updated text",
            completed: true
          }}, {new: true}
        ).then(result => {
          console.log(result)
          expect(result.text).toNotBe(originalText)
          expect(result.completedAt).toBeA('number')
          done()
        }).catch(e => done(e))
      })
    //expect(200)
    //custom => text is changed, completed is true, .toBeA
  });

  it("should clear completedAt when todo is not completed", done => {
    //grab id of second todo item
    var id = todos[1]._id.toHexString();
    //update text, set completed to false
    //expect(200)
    //text changed, completed false, completedAt is null .toNotExist
    //grab id of first item
    request(app)
      .patch(`/todos/${id}`)
      .expect(200)
      .end((err, res) => {
        if(err) {
          return done(err)
        }

      Todo.findByIdAndUpdate(id, {
        $set: {
          text: "updated text",
          completed: false
        }
      }, {
        returnOriginal: false,
        new: true
      }).then(todo => {
        expect(todo.completedAt).toNotExist();
        done()
      }).catch(e => done(e))

    })

  })
})
