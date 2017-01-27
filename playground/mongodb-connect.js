// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log("unable to connect to mongodb server");
  }
  console.log("Connected to MongoDB server");

  // db.collection("Todos").insertOne({
  //   text: "Something to do",
  //   completed: false
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('unable to insert todo')
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // })

  // insert new doc into USERS collection
  // props: name, age, location string
  // db.collection("Users").insertOne({
  //   name: "Alan",
  //   age: 24,
  //   location : "Belleville, IL"
  // }, (err,result) => {
  //   if(err) {
  //     return console.log("Could Not add User")
  //   }
  //
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
  // })

  db.close();
});
