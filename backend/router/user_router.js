const router = require('express').Router();

const userController = require('../controller/user_controller');
const {userMiddleWares} = require('../midlewars')

router.get('/', userController.getUsers);

router.post('/',
    userMiddleWares.isBodyValid,
    userMiddleWares.createUserMiddleWare,
    userController.createUser);

router.get('/:user_id',
    userMiddleWares.isUserIdValid,
    userMiddleWares.checkExistUser,
    userController.getUsersById);

router.put('/:user_id',
    userMiddleWares.isUserIdValid,
    userMiddleWares.checkExistUser,
    userController.updateUser);

router.delete('/:user_id',
    userController.deleteUser);

module.exports = router;
