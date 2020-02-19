const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')


const  OrdersContoller = require('../controllers/orders')
//Dont call just a reference
router.get('/',checkAuth, OrdersContoller.orders_get_all) ;


router.post('/' ,checkAuth, OrdersContoller.orders_create_order)

router.get('/:orderId', checkAuth, OrdersContoller.orders_get_one)



router.delete('/:orderId', checkAuth, OrdersContoller.orders_delete)

module.exports = router;

// morgan is logging package for nodejs

// CORS is Cross Origin Resource Sharing
// We can disable by sending some header from the server to the client
// that tells the browser which is running out client application, its okey u can have access
