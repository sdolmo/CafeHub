var express = require("express");
var router = express.Router({mergeParams: true});
var Cafe = require("../models/cafe");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// NEW - Display form to create new Comment
router.get("/new", middleware.isLoggedIn, function(req, res){
  Cafe.findById(req.params.id, function(err, cafe){
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {cafe: cafe});
    }
  })
});

// CREATE - Add a comment
router.post("/", middleware.isLoggedIn, function(req, res){
  Cafe.findById(req.params.id, function(err, cafe){
    if(err) {
      console.log(err);
      res.redirect("/cafes");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err) {
          console.log(err);
        } else {
          comment.author.id = req.user.id;
          comment.author.username = req.user.username;
          comment.save();
          cafe.comments.push(comment);
          cafe.save();
          req.flash("success", "Successfully added comment");
          res.redirect("/cafes/" + cafe._id);
        }
      })
    }
  });
});

// EDIT - Display form to edit comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    } else {
      res.render("comments/edit", {cafe_id: req.params.id, comment: foundComment});
    }
  })
});

// UPDATE - Update changes to comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedCafe){
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/cafes/" + req.params.id);
    }
  });
});

// DESTROY - Delete a comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted");
      res.redirect("/cafes/" + req.params.id);
    }
  })
});

module.exports = router;
