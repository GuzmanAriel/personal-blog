var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//Monggose/Model Config
var userSchema = new mongoose.Schema({
    username: String,
    userimage: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);