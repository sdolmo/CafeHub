var bodyParser = require("body-parser"),
    express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-oerride"),
    // Cafe = require("models/cafe"),
    // Comment = require("models/comment"),
    // User = require("models/user"),
    // seedDB = require("./seed.js");

// ROUTES
// var commentRoutes = require("./routes/comments"),
//     cafeRoutes = require("./routes/cafe"),
//     indexRoutes = require("./routes/index")

mongoose.connect("mongodb://localhost/cafehub");
app.use(bodyParser.urlencoded({extende: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
  secret: "Dream, Beleive, Discover",
  resave: false,
  caveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(3000, function(){
  console.log("Go to 3000!");
})
