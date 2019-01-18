var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    books: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book"
            } 
        ]
    
})
var User = mongoose.model("User",userSchema);
module.exports = User;