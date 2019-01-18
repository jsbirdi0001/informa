var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    Book = require("./models/book"),
    seedDB = require("./seed");

seedDB();
    
mongoose.connect("mongodb://localhost/informa");
    
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));

app.get("/",function(req,res){
    User.find({}).populate("books").exec(function(err, found){
        if(err){
            console.log(err);
        } else {
            res.render("index", {user: found})
        }
    })
});

    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Informa app has been Started");
})