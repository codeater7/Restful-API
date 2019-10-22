const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'handling  GET request to Product',
	});
});

router.post('/', (req, res, next) => {
    const product= {
        name: req.body.name,
        //how do we know? as we create we have to document so it is known
        price: req.body.price
    }
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
        message:' product deleted'
    })
	
});

module.exports = router;
