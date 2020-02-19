const mongoose = require('mongoose');

var productSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true },
	price: { type: Number, required: true },
	describe: {type: String, required:true},
	productImage: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);
//schema but we want it to be wrapped in the model, Schema is the layout, design, Model is the object itself
