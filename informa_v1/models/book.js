var mongoose = require("mongoose");
var User = require("./user");

var bookSchema = new mongoose.Schema({
    price: Number,
    book_name: String,
    edition: Number,
    author: String
})
var Book = mongoose.model("Book",bookSchema);

module.exports = Book;