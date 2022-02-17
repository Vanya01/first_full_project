const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const {MONGO_CONNECT_URL, PORT, NODE_ENV, ALLOWED_ORIGIN} = require('./configs/config');
require('dotenv').config();

mongoose.connect(MONGO_CONNECT_URL);
const swaggerJSON = require('./docs/swagger.json');
const productRouter = require('./router/product_router');
const app = express();
app.use(cors({origin: _configureCors}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
app.use('/products', productRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});


app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

function _configureCors(origin, callback) {
    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }
    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(new Error('CORS IS NOT ALLOWED'), false);
    }
    return callback(null, true);
}
