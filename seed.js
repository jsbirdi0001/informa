var mongoose = require("mongoose"),
    User = require("./models/user"),
    Book    = require("./models/book");

var data = [
    {
        name : "Jatinder Singh",
        email : "jsbirdi0001@gmail.com",
        phone : 4379259755
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
                                genre : "Science",
                                book_name : "Science",
                                edition : 2014,
                                author : "Albert Edison"
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