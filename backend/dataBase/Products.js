const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    productName: {
        type: String,
        required: false,
        trim: true,
        unique: true
    },

    price: {
        type: String,
        required: false,
        trim: true
    },

    img: {
        type: String,
        required: false,
        trim: true
    }
});


module.exports = model('product', productSchema);
