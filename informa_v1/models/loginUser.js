var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
    
var loginUserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})
loginUserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("loginUser", loginUserSchema);