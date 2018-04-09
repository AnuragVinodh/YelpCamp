var express = require('express');
var router = express.Router();
var Campground     = require('../models/campground.js');
var Comment        = require('../models/comment.js');
var User           = require("../models/user.js");
var passport       = require("passport");
var middeware      = require("../middleware/index.js");

router.get('/',function(req,res){
   res.render('campgrounds/landing');
});

// Authentication Routes

//resgister routes
router.get("/register", function(req,res){
    res.render("register");
});



router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    // res.send("pokemon");
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", "Something went Wrong! " + err.message); 
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success", "Successfully logged you in! Hi " + user.username); 
            res.redirect("/campgrounds");
        });
    });
});

 //login Routes
router.get("/login", function(req,res){
   res.render("login"); 
});

router.post("/login", passport.authenticate("local",
    
    {
        successRedirect:"/campgrounds",
        failureRedirect: "/login"
    }), 
    
    function(req,res){
    //does nothing
});

//logout Routes
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged you out!");  
    res.redirect('/campgrounds');
});



module.exports = router