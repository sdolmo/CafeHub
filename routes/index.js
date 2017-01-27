var express = require("express"),
    router = express.Router();

router.get("/", function(req, res){
  res.render("landing");
});

module.exports = router;
