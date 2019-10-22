const express = require('express');
const app = express();
const morgan = require('morgan')

//Routes
const productRoutes= require('./api/routes/product')
const orderRoutes= require('./api/routes/orders')



app.use(morgan('dev'));

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

// this above 2 lines or say middleware will lead to other so error handling will be nice 
//like as below

app.use((req,res,next)=>{
   const error = new Error('Not Found'); // we create error and we forward
   error.status = 400;
   next(error)               
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500 );
    res.json({
        message: error.message
    })
})

/* first server set up
app.use((req, res, next) => {
	res.status(200).json({
		message: 'its running',
	});
});*/

module.exports = app;
