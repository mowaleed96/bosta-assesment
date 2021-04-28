const router = require('express').Router();
const { userController, tokenController } = require('../controllers');

router.post('/signup', userController.signUp, tokenController.signUp);

router.get('/verify/:userId/:token', userController.verify);

module.exports = router;
