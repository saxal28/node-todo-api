// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log("unable to connect to mongodb server");
  }
  console.log("Connected to MongoDB server");

  //find one and update

  // db.collection("Todos").findOneAndUpdate({
  //   _id: new ObjectID("5889594d3934b1bf088d46aa")
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then(result => {
  //   console.log(result)
  // });

  //update name and increment age
db.collection("Users").findOneAndUpdate({
  _id: 123
}, {
  $set: {
    "Fuck Boii": "Kyle"
  },
  $inc: {
    age: 1
  }
}, {
  returnOriginal: false
}).then(result => {
  console.log(result)
})
  // db.close();
});
