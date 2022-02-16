const Product = require('../dataBase/Products');

module.exports = {
    getProducts: async (req, res, next) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (e) {
            next(e);
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            const {product_id} = req.params;
            const products = await Product.findByIdAndDelete(product_id);

            res.json(products);
        } catch (e) {
            next(e);
        }
    },

    getProductsById: async (req, res, next) => {
        try {
            const {product_id} = req.params;
            const product = await Product.findById(product_id).lean();

            res.json(product);
        } catch (e) {
            next(e);
        }
    },

    updateProduct: async (req, res) => {
        try {
            const {product_id} = req.params;
            const productsHere = req.body;
            const product = await Product.findByIdAndUpdate(product_id, productsHere, {new: true});

            res.status(201).json(product);
        } catch (e) {
            res.json(e.message);
        }
    },

    createProduct: async (req, res, next) => {
        try {
            const newProduct = await Product.create(req.body);
            res.json(newProduct);
        } catch (e) {
            next(e);
        }
    }
};
