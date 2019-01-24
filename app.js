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

app.get("/book/new",function(req,res){
    res.render("newBook");
})

app.get("/buy",function(req,res){
    User.find({}).populate('books').exec(function(err,user){
        if(err){
            console.log(err);
        } else{
            console.log(user);
            res.render("buyBook",{user:user})
        }
    })
})
app.post("/book",function(req,res){
    var uname, ulastname, uemail, uphone, bname, bauthor, bedition, bgenre, bprice;
    uname = req.body.uname;
    ulastname = req.body.ulastname;
    uemail= req.body.uemail;
    uphone= req.body.uphone;
    bname = req.body.bname;
    bauthor= req.body.bauthor;
    bedition= req.body.bedition;
    bgenre = req.body.bgenre;
    bprice = req.body.bprice;
    
    var obj = {
        firstname: uname,
        lastname: ulastname,
        email: uemail,
        phone: uphone
    }
    User.create(obj,function(err, user){
        if(err){
            console.log(err);
        } else{
            var bobj = {
                price: bprice,
                genre: bgenre,
                book_name: bname,
                edition: bedition,
                author: bauthor
            }
            Book.create(bobj, function(err, book){
                if(err){
                    console.log(err);
                } else{
                    console.log(("Added Comments"));
                    user.books.push(book);
                    user.save();
                    
                    res.redirect("/buy");
                }
            })
        }
    })
})


app.get("/business", function(req, res){
     Book.find({genre: "business"}, function(err, book){
         if(err){
             console.log(err);
         } else{
             User.find({}).populate('books').exec(function(err, user){
                if(err){
                    console.log(err);
                } else{
                    res.render("buyBook", {user: user})
                }
            }) 
         }
        
     })
})


    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Informa app has been Started");
})