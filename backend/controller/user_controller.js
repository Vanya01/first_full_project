const User = require('../dataBase/Users');
const userUtil = require('../util/helper');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const users = await User.findByIdAndDelete(user_id);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUsersById: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id).lean();
            const userNormalize = userUtil.userNormalizator(user);

            res.json(user);
            res.json(userNormalize);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const usersHere = req.body;
            const user = await User.findByIdAndUpdate(user_id, usersHere, {new: true});
            const newUser = userUtil.userNormalizator(user);

            res.status(201).json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res, next) => {
        try {
            console.log(req.body,'jjhhhghg');
            const newUser = await User.create(req.body);


            // User.createUserWithHashPassword(req.body);
            // await emailService.sendMail(req.body.email,WELCOME,{userName:req.body.name});
            res.json(newUser);
        } catch (e) {
            next(e);
        }
    }
};
