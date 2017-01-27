// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log("unable to connect to mongodb server");
  }
  console.log("Connected to MongoDB server");

  // db.collection("Todos").find({
  //   _id: new ObjectID("5889424b3934b1bf088d3fc1")
  // }).toArray().then((docs) => {
  //   console.log("Todos");
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log("Unable to Fetch Todos", err);
  // });

  // db.collection("Todos").find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log("Unable to Fetch Todos", err);
  // });

  db.collection("Users").find({name: "Jenn"}).toArray().then(count => {
    console.log(JSON.stringify(count, undefined, 2));
  }, (err) => {
      console.log("Unable to find Alan's Todos")
  })

  // db.close();
});
