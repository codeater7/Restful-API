//SYNTAX:  EXPORTS.(NAAME THAT WE GIVE)

const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

exports.orders_get_all = (req, res, next) => {
	Order.find()
		.select('product quantity _id')
		// populating queries with mongoose, it will show the name and price from the product, if not all, only name and
		.populate('product', 'name')
		.exec()
		.then(docs => {
			res.status(200).json({
				count: docs.length,
				orders: docs.map(doc => {
					return {
						_id: doc._id,
						product: doc.product,
						quantity: doc.quantity,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/orders/' + doc._id,
						},
					};
				}),
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err,
			});
		});
};

exports.orders_create_order = (req, res, next) => {
	// if we dont search for the the productId in product file, randomly we can make order where there is no product, so to minimise that
	// we search for the productID

	Product.findById(req.body.productId).then(product => {
		if (!product) {
			return res.status(404).json({
				message: 'product not found',
			});
		}

		const order = new Order({
			_id: mongoose.Types.ObjectId(),
			quantity: req.body.quantity,
			product: req.body.productId,
		});

		return (
			order
				.save()
				// .exec() gives us the real promise,
				//whereas normal queries gives ( like find ) gives then methods but no catch method
				.then(result => {
					console.log(result);
					res.status(201).json({
						message: 'order stored',

						createdOrder: {
							_id: result._id,
							product: result.product,
							quantity: result.quantity,
						},
						request: {
							type: 'GET',
							url: 'http://localhost:3000/orders/' + result._id,
						},
					});
				})
				.catch(err => {
					console.log(err);
					res.status(500).json({
						error: err,
					});
				})
		);
	});
};

//url bata ho ni ta so , req.params... body ta post ma
exports.orders_get_one = (req, res, next) => {
	Order.findById(req.params.orderId)
		.populate('product')
		.exec()
		.then(order => {
			if (!order) {
				return res.status(404).json({
					message: 'order not found',
				});
			}
			res.status(200).json({
				order: order,
				request: 'GET',
				url: 'http://localhost:3000/orders',
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err,
			});
		});
};


exports.orders_delete = (req, res, next) => {
	Order.remove({ _id: req.params.orderId })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Order deleted',
				request: {
					type: 'POST',
					url: 'http://localhost:3000/orders',
					body: { productId: 'ID', quantity: 'Number' },
				},
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err,
			});
		});
};
