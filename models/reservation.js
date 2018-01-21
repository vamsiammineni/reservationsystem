const mongoose = require('mongoose');
const reservationschema = mongoose.Schema({
	boxcar_name: {
		type: String
		require: true
	},
    user: {
    	type: String
    	required: true
    },
    project: {
 	type: String,
 	required: true
    },
    start_date: {
    	type: Date,
    	required: true
    },
    end_date: {
    	type: Date,
    	required: true
    }
});

module.exports = mongoose.module('reservation', reservationschema);