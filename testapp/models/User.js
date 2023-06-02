const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
    username:String,
    firstname:String,
    lastname:String,
    email:String,
    phone:Number,
    password:String
}) ;
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("users",UserSchema);