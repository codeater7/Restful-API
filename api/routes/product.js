const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'handling  GET request to Product',
	});
});

router.post('/', (req, res, next) => {
	res.status(201).json({
		message: 'handling  Post request to Product',
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
