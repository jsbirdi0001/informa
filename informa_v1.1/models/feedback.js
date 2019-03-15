var mongoose = require("mongoose");

var feedSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
})
var Feed = mongoose.model("Feed",feedSchema);

module.exports = Feed;