var mongoose = require("mongoose");
var Cafe = require("./models/cafe");
var Comment = require("./models/comment");

var data = [
  {
    name: "The Platform",
    image: "https://s-media-cache-ak0.pinimg.com/originals/84/cc/ca/84cccafae9fead96b47b73f0f946a502.jpg",
    location: "Miami",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    name: "Croissant Cabin",
    image: "http://www.getawaymavens.com/wp-content/uploads/2016/02/Sweetleaf-Coffeehouse-Long-Island-City-NY.jpg",
    location: "Brooklyn",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    name: "The Coffee Shop",
    image: "http://www.luminationnetwork.com/wp-content/uploads/2012/09/coffee-lunch-6.jpg",
    location: "New York",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  }
]

var seedDB = function() {
  Cafe.remove({}, function(err){
    // if(err){
    //   console.log(err);
    // }
    // console.log("remove cafes");
    // data.forEach(function(seed){
    //   Cafe.create(seed, function(err, cafe){
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log("added a cafe");
    //       Comment.create(
    //         {
    //           text: "This place is great, there's even Wifi",
    //           author: "Arianna"
    //         }, function(err, comment){
    //           if (err) {
    //             console.log(err);
    //           } else {
    //             cafe.comments.push(comment);
    //             cafe.save();
    //             console.log("Created new comment");
    //           }
    //         });
    //     }
    //   });
    // });
  });
}

module.exports = seedDB;
