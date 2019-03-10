var mongoose = require("mongoose"),
    User = require("./models/user"),
    Book    = require("./models/book");

var data = [
    {
        firstname: "Jatinder",
        lastname : "Singh",
        email : "jsbirdi0001@gmail.com",
        phone : 4379259755,
        genre: "Business"
    },
    {
        firstname: "Arshdeep",
        lastname : "Singh",
        email : "arshdeepsekhon016.com",
        phone : 6479604314,
        genre: "Architecture"
    },
    {
        firstname: "Harkrishan",
        lastname : "Singh",
        email : "harkrishan@gmail.com",
        phone : 45684631563,
        genre: "Science"
    },
    {
        firstname: "Amanjeet",
        lastname : "Singh",
        email : "amanjeet@gmail.com",
        phone : 6468451235,
        genre: "Computer Programming"
    },
    {
        firstname: "Kulwinder",
        lastname : "Singh",
        email : "kulwinder@gmail.com",
        phone : 6474479736,
        genre: "Web Development"
    },
    {
        firstname: "Kirandeep",
        lastname : "Singh",
        email : "kiranbirdi556@gmail.com",
        phone : 9915450454,
        genre: "Web Designing"
    },
    {
        firstname: "Harpreet",
        lastname : "Singh",
        email : "harpreet@gmail.com",
        phone : 4864531085,
        genre: "Architecture"
    },
    {
        firstname: "Harjot",
        lastname : "Singh",
        email : "harjot@gmail.com",
        phone : 46845311325,
        genre: "Computer Programming"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   User.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Book.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                User.create(seed, function(err, user){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a user");
                        //create a comment
                        Book.create(
                            {
                                price: 25,
                                book_name : "Believe and Achieve",
                                edition : 2014,
                                author : "Albert Edison",
                                description: "This is amazing book"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    console.log(("Added Comments"));
                                    user.books.push(comment);
                                    user.save();
                                    
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;