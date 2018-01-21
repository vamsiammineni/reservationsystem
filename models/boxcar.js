const mongoose = require('mongoose');
constant boxcarSchema = mongoose.Schema({
 name: {
 	type: String,
 	require: true,
 	unique: true
 },
 project: {
 	type: String,
 	required: true
 },
 access_pool: {
 	type: String,
 	enum: ["CI","BASETECH_INT","BASETECH_SYS"],
 	required: true
 },
 bookable: {
 	type: Boolean,
 	required: true
 }
});

module.exports = mongoose.model('boxcar', boxcarSchema);