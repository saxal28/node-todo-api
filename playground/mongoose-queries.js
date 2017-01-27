const { mongoose } = require("./../server/db/mongoose");
const { ObjectID } = require("mongodb");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

// var id = "588aaa6f054acdf806a1d2e9";
var id = "588a70a677b9cde658f3fd63";

if(!ObjectID.isValid(id)){
  console.log('ID not valid')
}

// Todo.find({
//   _id: id
// }).then(todos => {
//   if(todos.length < 1) {
//     return console.log("id not found");
//   }
//   console.log('todos', todos)
// }).catch(err => console.log('id not valid'));
//
// Todo.findOne({
//   _id: id
// }).then(todo => {
//   if(!todo) {
//     return console.log("id not found");
//   }
//   console.log("todo", todo)
// }).catch(err => console.log('id not valid'))
//
// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log("id not found");
//   }
//   console.log("todo by id: ", todo)
// }).catch(err => console.log("id not valid"))

User.findById(id).then(user => {
  if(!user){
    return console.log("user not found")
  }

  console.log(JSON.stringify(user, undefined, 2))
}).catch(e => console.log("not a valid user"));
