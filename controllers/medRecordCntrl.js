const asyncHandler = require('express-async-handler')
const MedRecord = require('../models/medRecModel');
const { Patient } = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const getAllMeds = asyncHandler(async (req,res) => {

    const medRec = await MedRecord.find({})
    res.status(200).json(medRec);
});

const addMedRec = asyncHandler(async(req,res)=>{
    const {patientId,doctor_name,prescription,disease,testResult} = req.body;

    if(!patientId || !doctor_name || !prescription || !disease){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const medRec = await MedRecord.create({patientId,
        doctor_name,prescription,disease
    });

    const patient = await Patient.findById({_id: patientId});
    await patient.medical_history.push(medRec);
    patient.save();

    const doctor = await Doctor.findById({_id: doctor_name});
    await doctor.medRecords.push(medRec)
    doctor.save()

    res.status(200).json(medRec);
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
    const medRecd = await MedRecord.findById({_id: medId});
    const medRec = await MedRecord.findOneAndDelete({_id: medId});
    if(!medRec){
        res.status(404);
        throw new Error(`Med record with id ${medId} does not exist`);
    }

    res.status(200).json({rec:medRec,mssg:"medicine deleted succesfully"});
    
});

const updateMedRec = asyncHandler(async(req,res)=>{
    const updateRec = await MedRecord.findOneAndUpdate(req.params.id,
            req.body,
            {new: true}
        )
    if(!updateRec){
        res.status(404);
        throw new Error("MedRecord not found");
    }
    res.status(200).json(updateRec)
})



module.exports={
    deleteMedRecord,
    getSingleMedRec,
    getAllMeds,
    addMedRec,
    updateMedRec

}