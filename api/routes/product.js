const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function(req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
	},
});

function fileFilter(req, file, cb) {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
}

const upload = multer({
	storage: storage,
	limits: {
		 fileSize: 1024 * 1024 * 5 
		},
	fileFilter: fileFilter,
});



// GET ALL THE LIST
router.get('/', ProductsController.products_get_all);

// upload == the middleware (multer)
//checkAuth

router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_post);

router.get('/:productId', ProductsController.products_get_single);

router.patch('/:productId',checkAuth, ProductsController.products_update);

router.delete('/:productId', checkAuth, ProductsController.products_delete);

module.exports = router;


