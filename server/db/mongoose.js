var mongoose = require("mongoose");
//tells mongoose to use promises in default javascript
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://saxal28:gatorade2@ds133279.mlab.com:33279/todo_app");

module.exports = {
  mongoose
};
