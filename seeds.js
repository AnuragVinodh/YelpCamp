
var mongoose   = require('mongoose');
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var data       = [
    
    { 
        name        : "Fort Collins",
        img         : "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d1c8cc988efddbda8746281871c0c8bf&auto=format&fit=crop&w=1000&q=60S",
        description : "Every great decision creates ripples. Like a huge boulder dropping in a lake. The ripples merge and rebound off the banks in unforseeable ways. The heavier the decision, the larger the waves, the more uncertain the consequences. Did I? It must be the carrot juice making me colour blind! Goodbye, Clara. Oh my word! Are these antiques dotted about all over the building? It really is a splendid piece of audioarchitectonicalmetrasynchosity! Shut up! Just shut up, shut up, shut up, shuttity up up up!                 Thank you, Strax. And if I\'m ever in need of advice from a psychotic potato dwarf, you\'ll certainly be the first to know. You were expecting someone else? I don\'t like it. Shush. I don\'t like it. Did I? It must be the carrot juice making me colour blind! The Time Lords are an immensely civilised race. We can control our own environment - we can live forever, barring accidents, and we have the secret of space/time travel. I\'m sorry. I\'m so sorry. And everybody lives, Rose! Everybody lives! I need more days like this! Go on, ask me anything; I\'m on fire An unintelligent enemy is far less dangerous than an intelligent one…. Now would you stand aside before I shoot myself? Reverse the polarity of the neutron flow. Your wish is my command. But be careful what you wish for. I reversed the polarity of the neutron flow. You\'ve had this place redecorated, haven\'t you? Hmm, don\'t like it. Do you have to talk like children? What is it that makes you so ashamed of being a grown-up? I had to face my fear...that was more important than just going on living...."
    } ,
    {
        name        : "Durango KOA Holiday",
        img         : "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b7ca353cfcc4299e6c3d431ff862e1cf&auto=format&fit=crop&w=500&q=60",
        description : "Nice to meet you, Rose. Once upon a time. The end. Dad skills. The trouble with computers, of course, is that they're very sophisticated idiots. They do exactly what you tell them at amazing speed. Even if you order them to kill you. So if you do happen to change your mind, it's very difficult to stop them from obeying the original order. But not impossible. There are some corners of the universe which have bred the most terrible things. Things which act against everything we believe in. They must be fought."
    } , 
    {
        name        : "FlagStaff KOA",
        img         : "https://images.unsplash.com/23/make-your-own-path.JPG?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=685864f4bc828bca3b32778b25778129&auto=format&fit=crop&w=500&q=60",
        description : "Please just... just see me. Are you taller? Why? Do you have to reach a high shelf? I've lived for over 2000 years and not all of them have been good. Underneath it all I think you're probably kind and nice, and very brave. I just wish you weren't a soldier. Soon, I expect. Or later. One of those. Mortuaries and larders. Easiest things to break out of. It's all right up to the eyebrows. Then it goes haywire. That's a relief. I hate babysitters. Shut it, Hoodie! Can I talk about planets now? My carer. She cares so I don't have to."
    }
    
];
    
    
    
function seedDB(){
 
     //Remove all existing Campgrounds
     
     Campground.remove({},function(err){
         
        if(err){
            
            console.log(err);
            
        } else { 
            
            
            Comment.remove({},function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log("Deleted all Comments !!")
                }
            });
            
            
            console.log("deleted all campground !!!");
            
                //adding Campgrounds
    
                // data.forEach(function(seed){
                //     Campground.create(seed, function(err, campground){
                //         if(err){
                            
                //             console.log(err);
                            
                //         } else {
                            
                //             console.log(" seeding done !! ");
                             
                //              // CREATE COMMENT
                             
                //              Comment.create({
                                 
                //                  text   : " BLAH BLAH BLAH BLAH",
                //                  author : " kenshi john"
                                 
                //              }, function(err, comment){
                //                  if(err){
                //                      console.log(err);
                //                  } else {
                //                     campground.comments.push(comment) ;
                //                     campground.save();
                //                     console.log("Created new Comment !!");
                //                  }
                                 
                //              });
                //         }
                //     }); 
                // });
        }
        
        
     });  
    
}

module.exports = seedDB;