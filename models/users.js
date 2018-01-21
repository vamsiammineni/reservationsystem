const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const usersSchema = mongoose.Schema({
first_name: {
type: String,
required: true
},
last_name: {
type: String,
required: true
},
email_id: {
type: String,
required: true,
uniquie: true
},
password: {
	type: String,
	required: true
}
});

usersSchema.pre('save', function(next){
var user = this;
var password = user.password;
bcrypt.hash(password, 10, function(err, hash){
if(err){
console.log(password);
console.log(err.message);
return next(err);
}
user.password = hash;
next();
});
});

module.exports = mongoose.model('user', usersSchema);

