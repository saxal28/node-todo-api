var mongoose = require("mongoose");
//tells mongoose to use promises in default javascript
mongoose.Promise = global.Promise;
mongoose.connect(process.env.PORT ? "mongodb://saxal28:gatorade2@ds133279.mlab.com:33279/todo_app" : "mongodb://localhost:27017/TodoApp");

module.exports = {
  mongoose
};
