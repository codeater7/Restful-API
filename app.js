const express = require('express');
const app = express();

//Routes
const productRoutes= require('./api/routes/product')
const orderRoutes= require('./api/routes/orders')

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

/* first server set up
app.use((req, res, next) => {
	res.status(200).json({
		message: 'its running',
	});
});*/

module.exports = app;
