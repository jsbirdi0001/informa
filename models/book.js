var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    genre: String,
    book_name: String,
    edition: Number,
    author: String
})
var Book = mongoose.model("Book",bookSchema);

module.exports = Book;