const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	//Ref is the reference to the product from the product.js schema
	email: {
		type: String,
		required: true,
		unique: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
// unique does not add any validation on purpose, instead it can do performance optomization
	password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
//schema but we want it to be wrapped in the model, Schema is the layout, design, Model is the object itself
