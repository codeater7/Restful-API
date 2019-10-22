const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'orders were fetched',
	});
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity


    }
	res.status(201).json({
        message: 'orders was created',
        quantity:order
	});
});

router.patch('/:orderId', (req, res, next) => {
	res.status(200).json({
        message: 'orders details  ',
        orderId: req.params.orderId
	});
});

router.delete('/:orderId', (req, res, next) => {
	res.status(200).json({
        message: 'orders deleted  ',
        orderId: req.params.orderId
	});
});


module.exports = router;

// morgan is logging package for nodejs

// CORS is Cross Origin Resource Sharing
// We can disable by sending some header from the server to the client
// that tells the browser which is running out client application, its okey u can have access
