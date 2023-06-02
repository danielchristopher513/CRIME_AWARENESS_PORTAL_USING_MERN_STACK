// Database Connections
//const MongoClient = require('mongodb').MongoClient;
//const url = "mongodb://localhost:27017/userdb";
/*var db;
MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    db = client.db('userdb');
    app.listen(8080);
    console.log('Listening on 8080');
});*/


// Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");

// Initialising Express
app.use(express.static('public'));
// set the view engine to ejs
app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//const mongoose = require("mongoose");

//testdb is our main database
const url = "mongodb://127.0.0.1:27017/testdb";

// connecting variable db to database

mongoose.connect(url, function (err) {
    if (err) throw err;
    //db = client.db('userdb');
    app.listen(8080);
    console.log('Listening on 8080');
});

app.use(require("express-session")({
    secret:"Any normal Word",       //decode or encode session
    resave: false,
    saveUninitialized:false
}));

passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
//var db = mongoose.connection;

app.use(bodyParser.urlencoded(
    { extended:true }
))
app.use(passport.initialize());
app.use(passport.session());

var Report_crime_Schema = new mongoose.Schema({
	firstname:String,
	lastname:String,
	email:String,
    date_time:String,
    complaint_type:String,
    location:String,
    description:String
});


var RCModel  = mongoose.model("ReportedCrimes",Report_crime_Schema);

// *** GET Routes - display pages ***

app.use(express.static(__dirname+ "/views/pages"));

// Root Route

/*
app.get('/home', function (req, res) {
    res.render('pages/index');
});

// Root Route

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/pages/report_crime.html");
});
*/

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/pages/signup.html");
});

app.get('/homepage', function (req, res) {
    res.sendFile(__dirname + "/views/pages/homepage.html");
});

app.post("/register",(req,res)=>{

    User.register(new User({username: req.body.username,firstname: req.body.firstname,lastname: req.body.lastname,email: req.body.email,phone:req.body.phone}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            //res.render("register");
            res.sendFile(__dirname + "/views/pages/signup.html");
        }
    passport.authenticate("local")(req,res,function(){
        res.redirect("/login");
        //res.sendFile(__dirname + "/views/pages/login.html");
    })
    })
})

app.get("/login",(req,res)=>{
    //res.render("login");
    res.sendFile(__dirname + "/views/pages/login.html");
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/homepage",
    failureRedirect:"/login"}),function (req, res){
});

app.get('/viewComplaints', function (req, res) {
    res.render('pages/viewComplaints');
});



// Users Route
/*

app.get('/userDef', function (req, res) {
    res.render('pages/userDetails');
});

app.get('/users', function (req, res) {

    // Find data in users collection
    RCModel.find({}).exec(function (err, result) {
    //db.collection("ReportedCrimes").find({}).toArray(function (err, result) {
        console.log("Users: " + JSON.stringify(result));
    // Show books page
        res.render('pages/users', {
		            userdetails: result
        });
    });
});
*/


app.get('/viewIssue', function (req, res) {

    // Find data in users collection
    RCModel.find({}).exec(function (err, result) {
    //db.collection("ReportedCrimes").find({}).toArray(function (err, result) {
        console.log("ReportedCrimes: " + JSON.stringify(result));
    // Show books page
    //res.sendFile(__dirname + "/views/pages/viewComplaints.html", {
        res.render('pages/viewComplaints', {
            Reporteddetails: result
        });
    });
});

app.post('/report_crime',function (req,res,next){

    var crimeDetails = new RCModel ({
          firstname : req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          date_time: req.body.date_time,
          complaint_type: req.body.complaint_type,
          location: req.body.location,
          description: req.body.description,
        });
    
        crimeDetails.save((err, doc) => {
            if (!err)
            {
                //alert("User Added successfully")
                res.sendFile(__dirname + "/views/pages/homepage.html");
                //res.send('User added successfully!');
                //res.redirect('/homepage');
                
            }
            else
            console.log('Error during record insertion : ' + err);
    
            //res.send('Data received:\n' + JSON.stringify(req.body));
        });
    
      });

      /*
app.post('/userDef',function (req,res,next){

var userDetails = new RCModel ({
      firstname : req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age
    });

	userDetails.save((err, doc) => {
		if (!err)
		{
			res.send('User added successfully!');
			//res.redirect('/home');
		}
		else
		console.log('Error during record insertion : ' + err);

		//res.send('Data received:\n' + JSON.stringify(req.body));
	});

  });
  */




