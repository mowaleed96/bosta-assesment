const router = require('express').Router();

const { reportController } = require('../controllers');

router.get('/', reportController.get);
router.get('/list', reportController.getAll);
router.post('/changeStatus', reportController.changeStatus);

module.exports = router;
