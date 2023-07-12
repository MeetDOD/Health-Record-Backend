const mongoose = require("mongoose")
const Doctor = require("./doctorModel")
const { Patient } = require("./patientModel")

const reptSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    doctor:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: [Doctor]
    },
    patient:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: [Patient]
    },

    result: {
        type: String,
        required: true
    }
});

const Test = mongoose.model("Test", reptSchema);

module.exports = {Test, reptSchema}