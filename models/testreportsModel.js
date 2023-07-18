const mongoose = require("mongoose")


const reptSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Patient'
    },

    result: {
        type: String,
        required: true
    }
});

const Test = mongoose.model("Test", reptSchema);

module.exports = {Test, reptSchema}
