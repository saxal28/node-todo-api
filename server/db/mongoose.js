var mongoose = require("mongoose");
//tells mongoose to use promises in default javascript
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

module.exports = {
  mongoose
};
