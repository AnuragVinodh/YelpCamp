var Campground     = require('../models/campground.js');
var Comment        = require('../models/comment.js');

var middleware = {};

middleware.isLoggedIn = function (req, res, next){
                            if(req.isAuthenticated()){
                                return next();
                            } else {
                                req.flash("error", "You must Log in !");  
                                res.redirect("/login");
                            }
                        }


middleware.checkOwnershipCampground = function (req, res, next){
                                           if(req.isAuthenticated()){
                                               Campground.findById(req.params.id, function(err, response){
                                                   if(err){
                                                       console.log(err);
                                                       req.flash("error", "Something went Wrong!");  
                                                       res.redirect('back');
                                                   } else {
                                                       //does the user own the campground
                                                       if(response.author.id.equals(req.user.id)){
                                                           next();
                                                       } else {
                                                           req.flash("error", "You don't have permission to do that!");  
                                                           res.redirect('back');
                                                       }
                                                   }
                                               });
                                                
                                            } else {
                                                req.flash("error", "You must Log in !");  
                                                res.redirect('back');
                                            }
                                    }

middleware.checkOwnershipComment =  function checkOwnershipComment(req, res, next){
                                            if(req.isAuthenticated()){
                                                
                                               Comment.findById(req.params.c_id, function(err, response){
                                                   if(err){
                                                       console.log(err);
                                                       req.flash("error", "Something went Wrong!"); 
                                                       res.redirect('back');
                                                   } else {
                                                       //does the user own the campground
                                                       if(response.author.id.equals(req.user.id)){
                                                           next();
                                                       } else {
                                                           req.flash("error", "You don't have permission to do that!"); 
                                                           res.redirect('back');
                                                       }
                                                   }
                                               });
                                                
                                            } else {
                                                req.flash("error", "You must Log in !");  
                                                res.redirect('back');
                                            }
                                    }


module.exports = middleware