const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// import the schema, and we want to create the real objects from here so, it is like constructor
const Product = require('../models/product');

router.get('/', (req, res, next) => {
	Product.find()
		.exec()
		.then(docs => {
			console.log(docs);
			res.status(200).json(docs);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
});
router.post('/', (req, res, next) => {
	// const product= {
	//     name: req.body.name,
	//     //how do we know? as we create we have to document so it is known
	//     price: req.body.price
	// };
	// we create the object from above assigined Product
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
	});
	product
		.save()
		.then(result => {
			console.log(result);

			//good result aayo so we want to respond
			res.status(201).json({
				message: 'handling POST requests to /products',
				createdProduct: result,
			});
		})
		.catch(err => {
			console.log(err);

			//bad aayo so we want to make it erroe
			res.status(500).json({ error: err });
		});
	// save() method provided by mongoose and we have to use it after creating
	//WORKFLeOW: create the schema and bring it here

	res.status(201).json({
		message: 'handling  Post request to Product',
		createdProduct: product,
	});
});

router.get('/:productId', (req, res, next) => {
	const id = req.params.productId; // extract the ID
	Product.findById(id)
		.exec()
		.then(doc => {
			console.log('from database', doc);
			

			//sometimes tehere wil be also good object but not from our database so we need to do the following
			if (doc) {
				res.status(200).json(doc);
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
			res.send(200).json(result);
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
			res.status(200).json(result);
		})

		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

module.exports = router;
