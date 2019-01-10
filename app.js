var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

    
    
    
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.render("index")
})
    
app.listen(process.env.IP, process.env.PORT, function(){
    console.log("Informa App has been started")
})
    