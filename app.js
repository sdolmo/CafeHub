var bodyParser = require("body-parser"),
    express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Cafe = require("./models/cafe"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seed.js");

// ROUTES
var    cafeRoutes = require("./routes/cafe"),
       commentRoutes = require("./routes/comments"),
       indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/cafe_hub");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

app.use(require("express-session")({
  secret: "Dream, Beleive, Discover",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/cafes", cafeRoutes);
app.use("/cafes/:id/comments", commentRoutes);

app.listen(3000, function(){
  console.log("Go to 3000!");
})
