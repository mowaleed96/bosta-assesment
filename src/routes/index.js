const router = require('express').Router();
const userRouter = require('./user');
const checkRouter = require('./check');
const reportRouter = require('./report');

router.use('/user', userRouter);
router.use('/check', checkRouter);
router.use('/report', reportRouter);
module.exports = router;
