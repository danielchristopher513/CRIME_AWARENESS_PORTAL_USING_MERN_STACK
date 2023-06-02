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

// Initialising Express
app.use(express.static('public'));
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/userdb";

// connecting variable db to database

mongoose.connect(url, function (err) {
    if (err) throw err;
    //db = client.db('userdb');
    app.listen(8080);
    console.log('Listening on 8080');
});
//var db = mongoose.connection;

var UserSchema = new mongoose.Schema({
	firstname:String,
	lastname:String,
	age:Number
});


var userModel  = mongoose.model("MyUsers",UserSchema);

// *** GET Routes - display pages ***

// Root Route
app.get('/home', function (req, res) {
    res.render('pages/index');
});

// Root Route
app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get('/userDef', function (req, res) {
    res.render('pages/userDetails');
});

// Users Route
app.get('/users', function (req, res) {

    // Find data in users collection
    userModel.find({}).exec(function (err, result) {
    //db.collection("MyUsers").find({}).toArray(function (err, result) {
        console.log("Users: " + JSON.stringify(result));
    // Show books page
        res.render('pages/users', {
		            userdetails: result
        });
    });
});

app.post('/userDef',function (req,res,next){

var userDetails = new userModel ({
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




