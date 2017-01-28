const { mongoose } = require("./../server/db/mongoose");
const { ObjectID } = require("mongodb");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

//remove all todos
// Todo.remove({}).then((result) => {
//   console.log("deleted", result)
// })

//Todo.findOneAndRemove
//Todo.findByIdAndRemove
Todo.findByIdAndRemove("588bb5513934b1bf088d5a7d").then(result => {
  console.log(result)
})
