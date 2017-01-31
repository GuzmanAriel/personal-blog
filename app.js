var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    Blog = require("./models/posts"),
    expressSanitizer = require("express-sanitizer");

//requiring routes
var postRoutes = require("./routes/posts"),
    userRoutes = require("./routes/user")
    

//App Config
mongoose.connect(process.env.DATABASEURL);
//mongoose.connect("mongodb://Ariel:heyheyhey@ds019946.mlab.com:19946/blog");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Ariel Guzman",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/", postRoutes);
app.use("/", userRoutes);

    
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is running"); 
})
