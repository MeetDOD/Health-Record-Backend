const asyncHandler = require('express-async-handler')
const MedRecord = require('../models/medRecModel')
const getAllMeds = asyncHandler(async (req,res) => {

    const medRec = await MedRecord.find({})
    res.status(200).json(medRec);
});

const addMedRec = asyncHandler(async(req,res)=>{
    const {patientId,doctor_name,prescription,disease,testResult} = req.body;

    if(!patientId || !doctor_name || !prescription || !disease || !testResult ){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const patient = await MedRecord.create({patientId,
        testResult,doctor_name,prescription,disease
    });

    res.status(200).json(patient);
});

const getSingleMedRec = asyncHandler(async(req,res)=>{

    const {id: medId} = req.params;
    const medRec = await MedRecord.findById({_id: medId});
    if(!medRec){
        res.status(404);
        throw new Error(`Med record with id ${medId} does not exist`);
    }
    res.status(200).json(medRec);
});

const deleteMedRecord = asyncHandler(async(req, res)=>{
    const {id: medId} = req.params;
    const medRec = await MedRecord.findByIdAndDelete({_id: medId});
    if(!medRec){
        res.status(404);
        throw new Error(`Med record with id ${medId} does not exist`);
    }
    res.status(200).json({rec:medRec,mssg:"medicine deleted succesfully"});
    
})


module.exports={
    deleteMedRecord,
    getSingleMedRec,
    getAllMeds,
    addMedRec

}