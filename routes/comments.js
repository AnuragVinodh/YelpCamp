var express = require('express');
var router = express.Router();
var Campground     = require('../models/campground.js');
var Comment        = require('../models/comment.js');
var User           = require("../models/user.js");
var methodOverride = require('method-override');
var middleware     = require('../middleware/index.js');

router.use(methodOverride("_method"));
//comments Routes

//new Route
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req,res){
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err,response){
       if(err){
           console.log(err);
       } else {
           res.render("comments/new", {value: response}); 
       }
    });
});

//Create Route

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req,res){
    
   var id = req.params.id;
   Campground.findById(id, function(err,campground){
       if(err){
           console.log(err);
           req.flash("error", "Something went Wrong!"); 
           res.redirect("/campgrounds/"+id+"/new");
       } else {
             Comment.create(req.body.comment ,function(err,comment){
                 if(err){
                     console.log(err);
                  } else {
                     //add username and id to comment
                     comment.author.id = req.user.id;
                     comment.author.username = req.user.username;
                     console.log(comment);
                     comment.save();
                     //save comment
                     campground.comments.push(comment);
                     campground.save();
                     req.flash("success", "Successfully added Comment"); 
                     res.redirect('/campgrounds/'+ id);
                  }
          });
       }
   });

});

// edit route
router.get("/campgrounds/:id/comments/:c_id/edit", middleware.checkOwnershipComment, function(req,res){
    Campground.findById(req.params.id).populate('comments').exec(function(err, response){
        if(err){
            console.log(err);
            req.flash("error", "Something went Wrong!"); 
            res.redirect("back");
        } else {
            // console.log(req.user.id);
            var reqComment
            response.comments.forEach(function(comment){
                if(comment._id.equals(req.params.c_id))
                     reqComment = comment;
            });
            res.render("comments/edit", {value: response, reqcomment: reqComment});
        }
    });
});

//update Route
router.put("/campgrounds/:id/comments/:c_id", middleware.checkOwnershipComment, function(req,res){
        Comment.findByIdAndUpdate(req.params.c_id, req.body.comment, function(err, response){
                if(err){
                    console.log(err);
                    req.flash("error", "Something went Wrong!"); 
                    res.redirect("/campgrounds/"+req.params.id);
                } else {
                    req.flash("success", "Successfully updated comment!"); 
                    res.redirect("/campgrounds/"+req.params.id);
                }
        });
});

//destroy Route
router.delete("/campgrounds/:id/comments/:c_id", middleware.checkOwnershipComment, function(req,res){
          Comment.findByIdAndRemove(req.params.c_id, function(err,response){
                if(err){
                    console.log(err);
                    req.flash("error", "Something went Wrong!"); 
                    res.redirect("back");
                } else {
                    req.flash("success", "Comment removed!!"); 
                    res.redirect('back');
                }
          });
});

module.exports = router;