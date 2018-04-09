var express        = require('express');
var router         = express.Router();
var Campground     = require('../models/campground.js');
var Comment        = require('../models/comment.js');
var methodOverride = require('method-override');
var middleware     = require('../middleware/index.js');

router.use(methodOverride("_method"));


// INDEX ROUTE
router.get('/campgrounds',function(req,res){
    //Get all campgrounds from DB
    Campground.find({} ,function(err, response){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/campgrounds",{data: response});
        }
    });
});




//NEW ROUTE
router.get('/campgrounds/new', middleware.isLoggedIn, function(req, res){
    res.render('campgrounds/new.ejs');
});




//Post request to create Campgrounds and save it to database
//CREATE ROUTE
router.post('/campgrounds', middleware.isLoggedIn, function(req,res){
   //info filling
   var name = req.body.name;
   var img = req.body.image;
   var des = req.body.des;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
  var newCampground = {name: name, img: img, description: des, author: author};
  //Saving info to Databasse
  Campground.create(newCampground,function(err,response){
      if(err){
          console.log(err);
          req.flash("error", "Something went Wrong!"); 
          res.redirect('/campgrounds');
      } else {
         //redirect
         req.flash("success", "Campground Added"); 
         res.redirect('/campgrounds');
      }
  });
});





//Show Route
router.get('/campgrounds/:id', function(req,res){
    //capturing id
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err,response){
       if(err){
           console.log(err);
       } else {
           //render file
        //   console.log(response);
           res.render("campgrounds/show.ejs", {value: response}); 
       }
    });

});






//edit route
router.get('/campgrounds/:id/edit', middleware.checkOwnershipCampground, function(req,res){
    //is user logged in
        
       Campground.findById(req.params.id, function(err, response){
           if(err){
               console.log(err);
               res.redirect("/campgrounds/"+req.params.id);
           } else {
               res.render("campgrounds/edit.ejs", {value: response});
           }
       
       });
   
});






//edit submit route
router.put('/campgrounds/:id', middleware.checkOwnershipCampground, function(req, res){
    Campground.findByIdAndUpdate( req.params.id, req.body.campground, function(err, response){
        if(err){
            console.log(err);
            req.flash("error", "Something went Wrong!"); 
            res.redirect('/campgrounds/'+req.params.id);
        } else {
            req.flash("success", "Successfully updated campground details!"); 
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
    // res.send("ore wa sugoi desu")
});






//delete route
router.delete('/campgrounds/:id', middleware.checkOwnershipCampground, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err, response){
            if(err){
                console.log(err);
                req.flash("error", "Something went Wrong!"); 
                res.redirect("/campgrounds"+req.params.id);
            } else {
                req.flash("success", "Deleted Campground"); 
                res.redirect("/campgrounds");
            }
    });
});


module.exports = router