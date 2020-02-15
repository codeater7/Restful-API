const mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	//Ref is the reference to the product from the product.js schema
	product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
	quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model('Order', orderSchema);
//schema but we want it to be wrapped in the model, Schema is the layout, design, Model is the object itself
