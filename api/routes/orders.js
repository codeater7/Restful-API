const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')


const  OrdersContoller = require('../controllers/orders')
//Dont call just a reference
router.get('/', OrdersContoller.orders_get_all) ;


router.post('/' ,OrdersContoller.orders_create_order)

router.get('/:orderId', OrdersContoller.orders_get_one)

router.patch('/:orderId', OrdersContoller.orders_patch )

router.delete('/:orderId', OrdersContoller.orders_delete)

module.exports = router;

// morgan is logging package for nodejs

// CORS is Cross Origin Resource Sharing
// We can disable by sending some header from the server to the client
// that tells the browser which is running out client application, its okey u can have access
