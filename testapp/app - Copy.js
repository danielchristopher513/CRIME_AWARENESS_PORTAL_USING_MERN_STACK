const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'userdb';

// Use the connect method to create a connection w/ the database
MongoClient.connect(url, (err, client) => {
    if (err) {
        throw err;
        return;
    }

    console.log('Database connection successful');

    // This objects holds the refrence to the db
    const db = client.db(dbName);

    const collection = db.collection('userdb');

	// Insert one document
	collection.insertOne({
	    firstName: 'anila',
	    lastName: 'george',
	    age: 41,
	    hobbies: [
	        'Reading books',
	        'Collecting stamps'
	    ]
	}, (err, result) => {
	    if (err) {
	        console.log(err);
	        return;
	    }
	    console.log(result.result);
	    client.close();
});

});

