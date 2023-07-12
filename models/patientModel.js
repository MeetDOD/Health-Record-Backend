const mongoose = require('mongoose');
const MedRecord = require('./medRecModel');

const patientSchema = mongoose.Schema({

    fname: {
        type: String,
        minLength: 3,
        required: [true, "first name is required"],
        maxLength: 100
    },

    lname: {
        type: String,
        minLength: 3,
        required: [true, "last name is required"],
        maxLength: 100
    },

    date_of_birth:{
        type: Date,
        required: [true, "date of birth is required"],
    },

    gender: {
        type: String,
    },

    contact_info: {
        type: Number,
        required: [true, "phone no. is required"],
    },

    medical_history: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedRecord'
    },

    insurance_details: {
        type: Number
    }
});

patientSchema.static('getFullName', function(patient) { return `${patient.fname}+${patient.lname}` });

const Patient = mongoose.model("Patient", patientSchema)
module.exports = {Patient, patientSchema}
