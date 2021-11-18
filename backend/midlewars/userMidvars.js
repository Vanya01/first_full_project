const {Types} = require('mongoose');

const User = require('../dataBase/Users');
const {createUserValidator} = require('../validators/user_validator');

module.exports = {

    isValid: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if (error) {
                throw new Error(error.message('Invalid user'), 404);
            }
            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkingRole: (roleArr = []) => (req, res, next) => {
        try {
            if (!roleArr.includes(req.role)) {
                throw new Error(e.message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    createUserMiddleWare: async (req, res, next) => {
        try {
            const {email} = req.body;
            const user = await User.findOne({email});

            if (user) {
                throw new Error('User already exist!!!')
            }

            next();
        } catch (e) {
            next(e.message);
        }
    },

    isBodyValid: (req, res, next) => {
        try {
            const {error, value} = createUserValidator.validate(req.body);

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

    checkExistUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await User.findOne({_id: Types.ObjectId(id)});

            if (!user) {
                throw new Error('not found user!!!')
            }
            req.role = user.role;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdValid: async (req, res, next) => {
        try {
            if (!Types.ObjectId.isValid(req.params.id)) {
                throw new Error('user id is invalid!!!')
            }

            next();
        } catch (error) {
            next(error.message);
        }
    },

    checkUserExistByEmail: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                throw new Error('not found user!');
            }

            req.body = user;

            next();
        } catch (e) {
            next(e);
        }
    },
}
