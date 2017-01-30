var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

router.get("/", function(req, res){
  res.render("landing");
});

// =========
// SIGN UP
// =========

// Show register form
router.get("/register", function(req, res){
  res.render("register");
});

// Create new user
router.post("/register", function(req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      return res.render("register", {"error": err.message});
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to CafeHub " + user.username);
      res.redirect("/cafes");
    });
  });
});

// =========
// LOGIN
// =========

// Show login form
router.get("/login", function(req, res){
  res.render("login");
});

// Handle login
router.post("/login", passport.authenticate("local", {
  successRedirect: "/cafes",
  failureRedirect: "/login"
}), function(req, res){
});

// =========
// LOGOUT
// =========

// Logout route
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "You logged out");
  res.redirect("/cafes");
});

module.exports = router;
