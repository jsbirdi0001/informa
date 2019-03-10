var mongoose = require("mongoose");

var subscribeSchema = new mongoose.Schema({
    email: String
})
var Subscribe = mongoose.model("Subscribe",subscribeSchema);

module.exports = Subscribe;