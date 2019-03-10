var mongoose = require("mongoose");
var Book = require("./book")

var userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: Number,
    genre: String,
    books: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book"
            } 
        ]
    
})
var User = mongoose.model("User",userSchema);
module.exports = User;