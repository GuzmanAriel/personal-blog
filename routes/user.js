var express = require("express");
var router  = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");


//AUTH ROUTES

router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, userimage: req.body.userimage});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/blogs"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/blogs",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/blogs");
});

    
module.exports = router;