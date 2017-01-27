// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log("unable to connect to mongodb server");
  }
  console.log("Connected to MongoDB server");

  //deleteMany
  // db.collection("Todos").deleteMany({text: "Learn to Code"}).then((result) => {
  //   console.log(result);
  // });
  //deleteOne
  // db.collection("Todos").deleteOne({text: "Eat Breakfast"}).then(results => {
  //   console.log(results);
  // })
  //findOneAndDelete
  // db.collection("Todos").findOneAndDelete({completed: false}).then(result => {
  //   console.log(result)
  // })

  //delete all Eat Breakfast Todos
  db.collection("Todos").deleteMany({text: "Eat Breakfast"}).then(result => {
    console.log("Deleting all 'Eat Breakfast' todos.....");
    console.log(result);
  })

  db.collection("Todos").findOneAndDelete(
    {_id: new ObjectID("5889424b3934b1bf088d3fc1")}).then(result => {
    console.log("Deleting 'Walk the Dog' todo.....")
    console.log(result);
  })

  // db.close();
});
