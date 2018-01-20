var express = require('express');
var app = express();

app.get('/', function(req,res){
res.send('welcome to the web application home');
});

app.listen(3000);
console.log('welcome back');