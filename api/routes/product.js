const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');

// import the schema, and we want to create the real objects from here so, it is like constructor
const Product= require('../models/product')

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'handling  GET request to Product',
	});
});

router.post('/', (req, res, next) => {
    // const product= {
    //     name: req.body.name,
    //     //how do we know? as we create we have to document so it is known
    //     price: req.body.price
	// };
	// we create the object from above assigined Product
	const Product= new Product({
		_id:new mongoose.Types.ObjectId(),
		name:req.body.name,
		price:req.body.price
	})
	product.save().then(result=> {
		console.log(result);
	}).catch(err=>console.log(err))
	// save() method provided by mongoose and we have to use it after creating
	//WORKFLeOW:
	// create the schema and bring it here
	
	res.status(201).json({
        message: 'handling  Post request to Product',
        createdProduct: product
	});
});

router.get('/:productId', (req, res, next) => {
	const id = req.params.productId; // extract the ID
	if (id == 'special') {
		res.status(200).json({
			message: 'discovered SPECIAL id',
			id: id,
		});
	} else {
		res.status(200).json({
			message: 'u passed an id',
		});
	}
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message:'updated product'
    })
	
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'product deleted'
	})
	
	
	
});

module.exports = router;