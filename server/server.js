const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

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
    res.status(404).send();
  }

  Todo.findById(id).then(todo => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  }, err => {
  }).catch(e => res.status(400).send())
});

app.delete("/todos/:id", (req, res) => {
  //get the id
  var id = req.params.id;
  //validate the id
  if(!ObjectID.isValid(id)){
    return res.status(404).send({});
  }

  Todo.findByIdAndRemove(id).then(result => {
    if(!result) {
      res.status(400).send({});
    }
    res.status(200).send({result});
  }).catch(e => res.status(404).send())
})

app.patch("/todos/:id", (req,res) => {
  var id = req.params.id;
  //only allows users to update properties on object
  var body = _.pick(req.body, ["text", "completed"])

  if(!ObjectID.isValid(id)){
    return res.status(404).send({});
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;

  }

  Todo.findByIdAndUpdate(id, {$set: body}).then(todo => {
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }).catch(e => res.status(400).send())
})

//POST /user => new user
// use ._pick to pick off actions
//shut down database, wipe database, and restart
app.post("/users", (req, res) => {
  var properties = _.pick(req.body, ["email","password"]);
  var user = new User({
    email: properties.email,
    password: properties.password
  });

  user.save().then(() => {
    user.generateAuthToken();
    // res.send(user)
  }).then(token => {
    res.header("x-auth", token).send(user);
  }).catch(e =>  {
    console.log(e)
    res.status(400).send(e);
  })
})

app.listen(port, () => {
  console.log(`Running on port ${port}`);
})

module.exports = {
  app
}
