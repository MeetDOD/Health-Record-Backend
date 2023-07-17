const Router = require('express');
const {getAllMeds,addMedRec,getSingleMedRec,deleteMedRecord} = require('../controllers/medRecordCntrl')
const router = Router();

router.route('/').get(getAllMeds).post(addMedRec);
router.route('/:id').get(getSingleMedRec).delete(deleteMedRecord);


module.exports = router