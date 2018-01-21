/* import required modules */
var express = require('express');
var logging = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');	
var path = require('path');
const port = 3000;

// Start the express application
var app = express();

const route = require('./routes/route');
const index = require('./routes/index');

// use CORS middleware
app.use(cors());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//use mongoose
var dbURI = 'mongodb://localhost:27017/reservationdb';
mongoose.connect(dbURI);
const db = mongoose.connection;


/* mongoose connection event */

// on succesful connection
db.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
db.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
db.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  db.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 



// use body parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// use morgan to log the http request details
app.use(logging('dev'));

//routing
app.use('/',index);
app.use('/api', route);

// starting point of the app
app.get('/', function(req,res){
res.send('welcome to the web application home');
});

app.listen(port, function(){
	console.log('server started on port : ' +port);
});
