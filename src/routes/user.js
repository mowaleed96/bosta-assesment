const router = require('express').Router();
const { userController } = require('../controllers');

router.post('/signup', userController.signUp);

router.get('/verify/', userController.verify);

router.post('/login', userController.login);
module.exports = router;
