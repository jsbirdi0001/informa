var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override");
    
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));

app.get("/",function(req,res){
    res.render("index");
});
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Informa app has been Started");
})