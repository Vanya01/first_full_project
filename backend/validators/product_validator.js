const Joi = require('joi');

const createProductValidator = Joi.object({
    productName: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    img: Joi
        .string()
        .required(),
    price: Joi
        .string()
        .required(),

});

module.exports = {
    createProductValidator
};
