var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    Book = require("./models/book"),
    seedDB = require("./seed"),
    validator = require("email-validator"),
    Subscribe = require("./models/subscribe"),
    Feed = require("./models/feedback");
    


// mongoose.connect("mongodb://localhost/informa",({useNewUrlParser:true}));
// mongoose.connect("mongodb+srv://jatinder96962:birdi6937@cluster0-w6ltf.mongodb.net/test?retryWrites=true", ({useNewUrlParser:true}));

// // DB Config
// const db = require('./config/key').mongoURI;

// // // Connect to MongoDB
// mongoose.connect(db,{useNewUrlParser: true}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://jatinder96962:birdi6937@cluster0-w6ltf.mongodb.net/test?retryWrites=true";

mongoose.connect(uri, {useNewUrlParser: true});

// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// const MongoClient = require('mongodb').MongoClient;

// // replace the uri string with your connection string.
// const uri = "mongodb+srv://jatinder96962:birdi6937@cluster0-w6ltf.mongodb.net/test?retryWrites=true"
// MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
//   if(err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//   }
//   console.log('Connected...');
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


    
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




app.get("/",function(req,res){
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

app.get("/buy",function(req,res){
    User.find({}).populate('books').exec(function(err,user){
        if(err){
            console.log(err);
        } else{
            res.render("buyBook",{user:user});
            console.log(req.user);
        }
    })
})
app.post("/book",isLoggedIn,function(req,res){
    var uname, ulastname, uemail, uphone, bname, bauthor, bedition, ugenre, bprice, bdescription, burl;
    uname = req.user.username;
    ulastname = req.user.name;
    uemail= req.user.email;
    uphone= req.user.phone;
    bname = req.body.bname;
    bauthor= req.body.bauthor;
    bedition= req.body.uedition;
    ugenre = req.body.bgenre;
    bprice = req.body.bprice;
    bdescription = req.body.description;
    burl = req.body.url;
    
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
                author: bauthor,
                description : bdescription,
                url: burl
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


app.get("/business",function(req, res){
    User.find({genre: "Business"}).populate('books').exec(function(err, found){
        if (err){
            console.log(err);
        } else {
            res.render("buyBook",{user: found})
        }
    })

})
app.get("/architecture", function(req, res){
    User.find({genre: "Architecture"}).populate('books').exec(function(err, found){
        if (err){
            console.log(err);
        } else {
            res.render("buyBook",{user: found})
        }
    })

})
app.get("/science", function(req, res){
    User.find({genre: "Science"}).populate('books').exec(function(err, found){
        if (err){
            console.log(err);
        } else {
            res.render("buyBook",{user: found})
        }
    })

})

app.get("/programming", function(req, res){
    User.find({genre: "Computer Programming"}).populate('books').exec(function(err, found){
        if (err){
            console.log(err);
        } else {
            res.render("buyBook",{user: found})
        }
    })

})

app.get("/webdesigner",function(req, res){
    User.find({genre: "Web Designing"}).populate('books').exec(function(err, found){
        if (err){
            console.log(err);
        } else {
            res.render("buyBook",{user: found})
        }
    })

})

app.get("/webdevelopment", function(req, res){
    User.find({genre: "Web Development"}).populate('books').exec(function(err, found){
        if (err){
            console.log(err);
        } else {
            res.render("buyBook",{user: found})
        }
    })

})
app.get("/buyBook/:id",isLoggedIn, function(req, res) {
    var a = req.params.id;
    User.findById(req.params.id).populate("books").exec(function(err, user){
        if(err){
            console.log(err);
        } else{
            console.log(user);
            res.render("showBuyBook",{user: user})
        }
    })
})
app.post("/underdevelopment",function(req, res) {
    res.send("The page is Under Development <br> <a href='/'><button>Go Back</button></a>")
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
    
    var usname = req.body.username;
    var usemail = req.body.email;
    var usphone = req.body.number;
    var usfullname = req.body.name;
    var obj = new loginUser({
        username: usname, name: usfullname, email: usemail, phone: usphone
    });
    loginUser.register(obj, req.body.password, function(err, created){
    if(err){
        console.log(err);
        res.redirect("/register");
    } else{
        passport.authenticate("local")(req,res,function(){
            console.log(created);
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

///////////////////////
/// Subscription Routes

app.post("/subscribe", function(req,res){
    Subscribe.create({email: req.body.email}, function(err, created){
        if(err){
            console.log(err);
        } else{
            console.log(created);
            res.redirect("/");
        }
    })
});

app.post("/feedback", function(req,res){
    var name, email, msg;
    name = req.body.name;
    email = req.body.email;
    msg = req.body.msg;
    var obj = {
        name: name,
        email: email,
        message: msg
    };
    Feed.create(obj, function(err, created){
        if(err){
            console.log(err);
        } else{
            res.redirect("/");
            console.log(created);
        }
    })
})


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else{
        res.redirect("/login")
    }
}







// app.listen(3000, function(){
//     console.log("Informa app Started");
// })
// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("Informa app has been Started");
// });

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));