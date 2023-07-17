const Router = require('express');
const {getAllTest,addTest,getSingleTest,deleteTest} = require('../controllers/testController')
const router = Router();

router.route('/').get(getAllTest).post(addTest);
router.route('/:id').get(getSingleTest).delete(deleteTest);


module.exports = router