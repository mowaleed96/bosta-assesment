const router = require('express').Router();
const { checkController } = require('../controllers');

router.get('/', checkController.get);
router.get('/list', checkController.getAll);
router.post('/create', checkController.create);
router.post('/update', checkController.update);
router.delete('/delete', checkController.remove);

module.exports = router;
