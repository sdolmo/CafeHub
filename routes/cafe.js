var express = require("express"),
    router  = express.Router(),
    Cafe    = require("../models/cafe");

// INDEX - Display all cafes
router.get("/", function(req, res){
  Cafe.find({}, function(err, allCafes){
    if (err) {
      console.log("SOMETHING WENT WRONG!");
      console.log(err);
    } else {
      res.render("cafes/index", {cafes: allCafes});
    }
  })
});

// CREATE - Add new cafe to DB
router.post("/", function(req, res) {
  Cafe.create(req.body.cafe, function(err, newCafe) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/cafes")
    }
  })
});

// NEW - Display form to create a new cafe post
router.get("/new", function(req, res){
  res.render("cafes/new");
});


module.exports = router;
