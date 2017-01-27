var mongoose = require("mongoose");

var User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
})

// var newUser = new User({
//   email: "saxal28yahoo.com "
// })
//
// newUser.save().then(user => {
//   console.log(user)
// }, err => {
//   console.log(err)
// })

module.exports = {User};
