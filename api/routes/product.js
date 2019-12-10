const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function(req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
	},
});

function fileFilter(req, file, cb) {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
}

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: fileFilter });

// import the schema, and we want to create the real objects from here so, it is like constructor
const Product = require('../models/product');

router.get('/', (req, res, next) => {
	Product.find()
		.select('name price _id productImage') // it will only fetch these fields
		.exec()
		// below here we are modifying the response we get out.. adding count
		.then(docs => {
			const response = {
				count: docs.length,
				products: docs.map(doc => {
					return {
						_id: doc._id,
						name: doc.name,
						price: doc.price,
						productImage: doc.productImage,

						request: {
							type: 'GET',
							url: 'http://localhost:3000/products/' + doc._id,
						},
					};
				}),
			};
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
});
// upload == the middleware (multer)
router.post('/', upload.single('productImage'), (req, res, next) => {
	// in the post we have to use the schema, instiantiate the new one
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		productImage: req.file.path,
	});

	product
		.save()
		.then(result => {
			console.log(result);

			res.status(201).json({
				message: 'handling POST requests to /products',

				createdProduct: {
					_id: result.id,
					name: result.name,
					price: result.price,
					
					request: {
						type: 'GET',
						url: 'http://localhost:3000/products/' + result._id,
					},
				},
			});
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
		res.status(201).json({
			message: 'handling  Post request to Product',
			createdProduct: product,
		})
});

router.get('/:productId', (req, res, next) => {
	const id = req.params.productId; // extract the ID
	Product.findById(id)
		.select('name price_id productImage')
		.exec()
		.then(doc => {
			console.log('from database', doc);

			//sometimes tehere wil be also good object but not from our database so we need to do the following
			if (doc) {
				res.status(200).json({
					product: doc,
					request: {
						type: 'GET',
						description: 'Get all products',
						url: ' http://localhost:3000/products',
					},
				});
			} else {
				res.status(404).json({ message: 'No valid entry found for the provided id' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

// 	if (id == 'special') {
// 		res.status(200).json({
// 			message: 'discovered SPECIAL id',
// 			id: id,
// 		});
// 	} else {
// 		res.status(200).json({
// 			message: 'u passed an id',
// 		});
// 	}
// });

router.patch('/:productId', (req, res, next) => {
	const id = req.params.productId;
	const updateOps = {};

	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Product.update({ _id: id }, { $set: updateOps })
		.exec()
		.then(result => {
			res.send(200).json({
				message: 'Product updated',
				request: {
					type: 'GET',
					url: 'http://localhost:3000/products/' + id,
				},
			});
		})
		.catch(err => {
			console.log(err);
			res.send(500).json({ error: err });
		});
});

router.delete('/:productId', (req, res, next) => {
	const id = req.params.productId;
	Product.remove({ _id: id })

		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Product deleted',
				url: 'http://localhost:3000/products',
				body: { name: 'String', price: 'Number' },
			});
		})

		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

module.exports = router;
