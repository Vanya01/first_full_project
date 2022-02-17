module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://...', //doesnt work mongo db

    PORT: process.env.PORT || 5000,
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000'
};
