const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');
const mongoose= require('mongoose');


// Multer will ( like boy parser) parse form data bodies

//Routes
const productRoutes= require('./api/routes/product')
const orderRoutes= require('./api/routes/orders')
const userRoutes= require('./api/routes/user')

// mongoose.connect('mongodb+srv://sujan:password134@cluster0-hb41h.mongodb.net/test?retryWrites=true&w=majority', { 
mongoose.connect('mongodb+srv://sujan:password134@cluster0-hb41h.mongodb.net/test?retryWrites=true&w=majority', { 
    // useMongoClient: true
    useNewUrlParser: true,
    useUnifiedTopology: true
    
})
//use default global implementation from node rather than from the mongoose
mongoose.Promise= global.Promise;
//under the hood use of mongoClient is ok


app.use(morgan('dev'));
// to make the app puböicly available
// /uploads, it us only used to only parse request to this link but will ignore that part

app.use( '/uploads', express.static('uploads'));
// use body parser but for what kind, true allows to parse extended bodies, false to only simple body
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// which header may be sent along with the request?
//Orign, X-Requested-With,Content-Type, Accept, Authorization


app.use((req,res,next)=>{
    res.header ('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Origin','Orign, X-Requested-With,Content-Type, Accept, Authorization')
    // Method is property which gives us access to http methods
    if (req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE,GET')
        return res.status(200).json({})
    }

    
next();
})



app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/user',  userRoutes )

// mongoose.connect('mongodb+srv://sujan:password134@cluster0-hb41h.mongodb.net/test?retryWrites=true&w=majority', { 
//     useMongoClient: true
    
// })
// //use default global implementation from node rather than from the mongoose
// mongoose.Promise= global.Promise;
// //under the hood use of mongoClient is ok


// // this above 2 lines or say middleware will lead to other so error handling will be nice 


app.use((req,res,next)=>{
   const error = new Error('Not Found'); // we create error and we forward
   error.status = 404;
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


// body-parser == to parse the body of incoming request, does not support files but support url encoded bodies and json data
