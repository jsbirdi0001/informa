var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    Book = require("./models/book"),
    seedDB = require("./seed"),
    validator = require("email-validator");
seedDB();
    
mongoose.connect("mongodb://localhost/informa");
    
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));

//******************
// Auth Packages and Routes
//******************
var passport = require("passport"),
    passportLocalMongoose = require("passport-local-mongoose"),
    localStrategy = require("passport-local"),
    loginUser = require("./models/loginUser");
    
app.use(require("express-session")({
    secret: "My name is Khan",
    resave: false,
    saveUninitialized: false
}))
passport.use(new localStrategy(loginUser.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(loginUser.serializeUser());
passport.deserializeUser(loginUser.deserializeUser());
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();

});




app.get("/",isLoggedIn,function(req,res){
    User.find({}).populate("books").exec(function(err, found){
        if(err){
            console.log(err);
        } else {
            res.render("index", {user: found})
        }
    })
});

app.get("/book/new",isLoggedIn,function(req,res){
    res.render("newBook");
})

app.get("/buy",isLoggedIn,function(req,res){
    User.find({}).populate('books').exec(function(err,user){
        if(err){
            console.log(err);
        } else{
            console.log(user);
            res.render("buyBook",{user:user})
        }
    })
})
app.post("/book",isLoggedIn,function(req,res){
    var uname, ulastname, uemail, uphone, bname, bauthor, bedition, ugenre, bprice;
    uname = req.body.uname;
    ulastname = req.body.ulastname;
    uemail= req.body.uemail;
    uphone= req.body.uphone;
    bname = req.body.bname;
    bauthor= req.body.bauthor;
    bedition= req.body.bedition;
    ugenre = req.body.bgenre;
    bprice = req.body.bprice;
    
    var obj = {
        firstname: uname,
        lastname: ulastname,
        email: uemail,
        phone: uphone,
        genre: ugenre
    }
    User.create(obj,function(err, user){
        if(err){
            console.log(err);
        } else{
            var bobj = {
                price: bprice,
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


app.get("/business", isLoggedIn,function(req, res){
    User.find({genre: "Business"}).populate('books').exec(function(err, found){
        if (err){
            console.log(err);
        } else {
            res.render("buyBook",{user: found})
        }
    })

})
app.get("/architecture",isLoggedIn, function(req, res){
    User.find({genre: "Architecture"}).populate('books').exec(function(err, found){
        if (err){
            console.log(err);
        } else {
            res.render("buyBook",{user: found})
        }
    })

})
app.get("/science",isLoggedIn, function(req, res){
    User.find({genre: "Science"}).populate('books').exec(function(err, found){
        if (err){
            console.log(err);
        } else {
            res.render("buyBook",{user: found})
        }
    })

})

app.get("/programming",isLoggedIn, function(req, res){
    User.find({genre: "Computer Programming"}).populate('books').exec(function(err, found){
        if (err){
            console.log(err);
        } else {
            res.render("buyBook",{user: found})
        }
    })

})

app.get("/webdesigner", isLoggedIn,function(req, res){
    User.find({genre: "Web Designing"}).populate('books').exec(function(err, found){
        if (err){
            console.log(err);
        } else {
            res.render("buyBook",{user: found})
        }
    })

})

app.get("/webdevelopment",isLoggedIn, function(req, res){
    User.find({genre: "Web Development"}).populate('books').exec(function(err, found){
        if (err){
            console.log(err);
        } else {
            res.render("buyBook",{user: found})
        }
    })

})



////***********************
//// AUTH ROUTES
////***********************

app.get("/login", function(req, res) {
    res.render("login");
})
app.get("/register",function(req, res) {
    res.render("register");
})

app.post("/register",function(req,res){
    
        loginUser.register(new loginUser({username: req.body.username, email: req.body.email}), req.body.password, function(err, created){
        if(err){
            console.log(err);
            res.redirect("/register");
        } else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/");
            })
        }
        })
        
    });
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function(){
    
})
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/")
})




function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else{
        res.redirect("/login")
    }
}








app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Informa app has been Started");
})