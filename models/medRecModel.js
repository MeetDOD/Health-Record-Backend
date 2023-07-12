const mongoose=require('mongoose');
const { Patient } = require('./patientModel');
const Doctor = require('./doctorModel');
const Medication = require('./medicationsModel');

const medicalRecord = mongoose.Schema({
    patientId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:[Patient]
    },
    record_date:{
        type:Date,
        default:Date.now()
    },
    doctor_name:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:[Doctor],
        default:'Ashish Babu'
    },
    prescription:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:[Medication]
    },
    disease:{
        type:String,
        required:true
    },
    testResult:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:[Test]
    },
})

const MedRecord = mongoose.model("MedRecord", medicalRecord);

module.exports = MedRecord;