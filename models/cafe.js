var mongoose = require("mongoose");

var cafeSchema = new mongoose.Schema({
  name: String,
  image: String,
  state: String,
  location: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Cafe", cafeSchema);
