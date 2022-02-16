const router = require('express').Router();

const productController = require('../controller/product_controller');

router.get('/', productController.getProducts);

router.post('/',
    productController.createProduct);

router.get('/:product_id',
    productController.getProductsById);

router.put('/:product_id',
    productController.updateProduct);

router.delete('/:product_id',
    productController.deleteProduct);

module.exports = router;
