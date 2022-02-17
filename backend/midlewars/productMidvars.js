const {Types} = require('mongoose');

const Product = require('../dataBase/Products');
const {createProductValidator} = require('../validators/product_validator');

module.exports = {

    isValid: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if (error) {
                throw new Error(error.message('Invalid product'), 404);
            }
            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyValid: (req, res, next) => {
        try {
            const {error, value} = createProductValidator.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                throw new Error(error.details[0].message, 400);
            }

            req.body = value;
            next();
        } catch (e) {
            throw new Error(e.message);
        }
    },

    checkExistProduct: async (req, res, next) => {
        try {
            const {id} = req.params;
            const product = await Product.findOne({_id: Types.ObjectId(id)});

            if (!product) {
                throw new Error('not found product!!!');
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    // eslint-disable-next-line require-await
    isProductIdValid: async (req, res, next) => {
        try {
            if (!Types.ObjectId.isValid(req.params.id)) {
                throw new Error('Product id is invalid!!!');
            }

            next();
        } catch (error) {
            next(error.message);
        }
    },


};
