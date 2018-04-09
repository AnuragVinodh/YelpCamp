var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var Campground     = require('./models/campground.js');
var Comment        = require('./models/comment.js');
var seedDB         = require("./seeds");
var passport       = require("passport");
var localStratergy = require("passport-local");
var User           = require("./models/user.js");
var methodOverride = require('method-override');
var flash          = require('connect-flash');

//Routes

var campgroundRoutes = require('./routes/campgrounds.js');
var commentRoutes    = require('./routes/comments.js');
var indexRoutes      = require('./routes/index.js');

// seedDB(); // seeding

mongoose.connect('mongodb://localhost/yelp_camp');
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());
//Passport Configuration
app.use(require("express-session")({
    secret: "Pokemon Rocks !",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
})

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The Server has started!!!");
})

