var express = require("express");
var router  = express.Router();
var Cafe    = require("../models/cafe");
var middleware = require("../middleware");

// INDEX - Display all cafes
router.get("/", function(req, res){
  Cafe.find({}, function(err, allCafes){
    if (err) {
      console.log("SOMETHING WENT WRONG!");
      console.log(err);
    } else {
      res.render("cafes/index", {cafes: allCafes, currentUser: req.user})
    }
  })
});

// CREATE - Add new cafe to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
  var name  = req.body.name;
  var image = req.body.image;
  var state = req.body.state;
  var location = req.body.location;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var addCafe = {name: name, image: image, state: state, location: location, description: desc, author: author};
  Cafe.create(addCafe, function(err, newCafe) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/cafes")
    }
  })
});

// NEW - Display form to create a new cafe post
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("cafes/new");
});

// SHOW - Display more info about one cafe
router.get("/:id", function(req, res){
  Cafe.findById(req.params.id).populate("comments").exec(function(err, foundCafe){
    if(err){
      console.log(err);
    } else {
      res.render("cafes/show", {cafe: foundCafe});
    }
  })
});

// EDIT - Display form to edit a cafe
router.get("/:id/edit", middleware.checkCafeOwnership, function(req, res){
  Cafe.findById(req.params.id, function(err, foundCafe){
    if (err) {
      res.redirect("/cafes")
    } else {
      res.render("cafes/edit", {cafe: foundCafe});
    }
  })
});

// UPDATE - Update edits to cafe
router.put("/:id", middleware.checkCafeOwnership, function(req, res){
  Cafe.findByIdAndUpdate(req.params.id, req.body.cafe, function(err, updateCafe){
    if (err) {
      res.redirect("/cafes");
    } else {
      res.redirect("/cafes/" + req.params.id);
    }
  })
});

// DESTROY - Delete a cafe
router.delete("/:id", middleware.checkCafeOwnership, function(req, res){
  Cafe.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.redirect("/cafes");
    } else {
      res.redirect("/cafes");
    }
  })
});


module.exports = router;
