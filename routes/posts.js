var express = require("express");
var router  = express.Router({mergeParams: true});
var Blog = require("../models/posts");
var User = require("../models/user");


router.get("/", function(req, res){
    res.redirect("/blogs");
});

//INDEX ROUTE
router.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs: blogs});
        }
    });
});

//FEDev Route
router.get("/blogs/FEDev", function(req, res){
   Blog.find({}).where('category').equals('FEDev').exec(function(err, blogs) {
        res.render("codeblog", {blogs: blogs});
  });
});


//Other ROUTE
router.get("/blogs/other", function(req, res){
    Blog.find({}).where('category').equals('Other').exec(function(err, blogs) {
        res.render("otherblog", {blogs: blogs});
  });
});

//FEDev Route
router.get("/blogs/Sports", function(req, res){
   Blog.find({}).where('category').equals('Sports').exec(function(err, blogs) {
        res.render("sportsblog", {blogs: blogs});
  });
});


//NEW ROUTE
router.get("/blogs/new", function(req, res){
    res.render("new");
});

//CREATE ROUTE
router.post("/blogs", function(req, res){
        var title = req.body.blog.title;
        var image = req.body.blog.image;
        var body = req.body.blog.body;
        var category = req.body.blog.category;
        
        var author = {
            id: req.user._id,
            username: req.user.username,
            userimage: req.user.userimage
        }
        var newlyBlog = {title: title, image: image, body: body, category: category, author:author};
        
        Blog.create(newlyBlog, function(err, newBlog){
            if(err){
                res.render("new");
            }else{
                console.log(req.body);
                console.log(newlyBlog);
                console.log(category);
                res.redirect("/blogs");
            }
        });
        //then redirect
});


//SHOW Route
router.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show", {blog: foundBlog});
        }
    });
});

router.get("/blogs:id/edit", function(req, res){
    Blog.findById(req.params.id,function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
             res.render("edit", {blog: foundBlog});
        }
    });
});

//UPDATE ROUTE
router.put("/blogs:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs" + req.params.id);
        }
    })
});

//DELETE ROUTE
router.delete("/blogs/:id", function(req, res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err, removedBlog){
        if(err){
            res.redirect("/blogs/");
        }else{
            res.redirect("/blogs/");
        }
    });
    //redirect to somewhere
});


//****************************************
//SPORTS BLOG SCHEMA
//****************************************
module.exports = router;