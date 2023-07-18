const mongoose=require('mongoose');
;

const medicalRecord = mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Patient'
    },
    record_date:{
        type:Date,
        default:Date.now()
    },
    doctor_name:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Doctor',
        default:'Ashish Babu'
    },
    prescription:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Medication'
    },
    disease:{
        type:String,
        required:true
    },
    testResult:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Test'
    },
})

const MedRecord = mongoose.model("MedRecord", medicalRecord);

module.exports = MedRecord;
