var express = require("express");
var bodyParser = require("body-parser")

var {mongoose} = require("./db/mongoose");
var { ObjectID } = require("mongodb");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
   var todo = new Todo({
     text: req.body.text
   })
   todo.save().then((todo) => {
     console.log('added todo...')
     res.send(todo)
   }, err => {
     res.status(400).send(err)
   })
});

app.get("/todos", (req, res) => {
  Todo.find().then(todos => {
    res.send({todos})
  }, err => {
    res.status(400).send(err);
  });
});

app.get("/todos/:id", (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    console.log("ID is not valid");
    res.status(404).send();
  }

  Todo.findById(id).then(todo => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  }, err => {
    console.log("ERROR");
  }).catch(e => res.status(400).send())
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
  console.log(process.env.PORT);
})

module.exports = {
  app
}
