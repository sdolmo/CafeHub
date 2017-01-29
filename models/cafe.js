var mongoose = require("mongoose");

var cafeSchema = new mongoose.Schema({
  name: String,
  image: String,
  location: String,
  description: String
});

module.exports = mongoose.model("Cafe", cafeSchema);
