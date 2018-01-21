const express = require('express');
const router = express.Router();

const user = require('../models/users');

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

router.get('/users', function(req, res){
users.find(function(err, users){
if (err){
	res.json(err);
}
else {
	res.json(users);
}
});
});

module.exports = router;