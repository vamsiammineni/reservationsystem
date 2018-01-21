const express = require('express');
var app = express();
const router = express.Router();
var jwt    = require('jsonwebtoken'); 
var bcrypt = require('bcrypt');
app.set('superSecret', 'ilovescotchyscotch'); // secret variable
const user = require('../models/users');

router.get('/', function(req, res){
res.send('api home here');
});

// register an user
router.post('/register', function(req, res){
	if(req.body.first_name && req.body.last_name && req.body.email_id && req.body.password) {
		var newuser = new user({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email_id: req.body.email_id,
			password: req.body.password
			});
		}

	newuser.save(function (err) {
    if (err) {
      res.send('err');
    } else {
      res.send('user successfully registered');
    }
  });

});

// get the registered users
router.get('/users', function(req, res){
user.find(function(err, users){
if (err){
	res.json(err);
}
else {
	res.json(users);
}
});
});

// logon 
router.post('/logon', function(req, res){
user.findOne({email_id: req.body.email_id}, function(err, user){
	if(err) throw err;
	if(!user) {
		res.json({success : false, message: 'Authentication failed, User not found'});
	}
	else if(user){
        bcrypt.compare(req.body.password, user.password, function (err, result) {
          if(err){
          	res.json('password doesnot match, Authentication failed');
          }
          else {

        // if user is found and password is right
        // create a token with only our given payload
    // we don't want to pass in the entire user since that has the password
    const payload = {
      email_id: user.email_id 
    };
    console.log(payload);
        var token = jwt.sign(payload, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

        });
	}
})
});

module.exports = router;