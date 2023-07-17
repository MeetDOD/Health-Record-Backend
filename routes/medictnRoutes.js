const Router = require('express');
const {addMedication,getMedication,deleteMed,getMedicationById} = require('../controllers/mediCntrl')
const router = Router();

router.route('/').get(getMedication).post(addMedication);
router.route('/:id').get(getMedicationById).delete(deleteMed);


module.exports = router