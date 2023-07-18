const Medication = require('../models/medicationsModel');
const asyncHandler = require('express-async-handler');
const addMedication = async (req, res) => {

    const { name, description, dosage_instructions } = req.body;
    try {
        if (!name || !description || !dosage_instructions) {
            return res.status(400).json({ msg: "Not all fields have been entered" })
        }

        const newMedication = new Medication({
            name,
            description,
            dosage_instructions
        });

        const savedMedication = await newMedication.save();
        res.json({ medication: savedMedication, mssg: "medication added successfully!!" });


    } catch (error) {
        res.status(400).json({ mssg: "eroor in addition of medicine" })
        console.log(error)

    }
}
const getMedication = async (req, res) => {
    try {
        const medications = await Medication.find();
        res.json({ medication: medications, mssg: "medication fetched successfully" });
    } catch (error) {
        res.status(400).json({ mssg: "eroor in getting medications" })
        console.log(error)
    }
}
const getMedicationById = async (req, res) => {
    const { id: MedicineId } = req.params.id;
    try {
        const medicine = await Medication.findById(MedicineId);

        res.json({ medication: medicine, mssg: `medicine fetched for ${MedicineId} ` })

    } catch (error) {
        res.status(400).json({ mssg: "eroor in getting medications" })
        console.log(error)
    }
}
const deleteMed = async (req, res) => {
    const { id: MedicineId } = req.params.id;
    try {
        const medicine = await Medication.findById(MedicineId);
        if (!medicine) {
            res.status(404);
            throw new Error(`Medicine record with id ${MedicineId} does not exist`);
        }
        await Medication.findByIdAndDelete(MedicineId);

        res.json({ medicine: MedicineId, mssg: `"Medicine ${MedicineId} deleted ` })
    } catch (error) {
        res.status(400).json({ mssg: "eroor in deletion of  medications" })
        console.log(error)

    }
};


const updateMedication = asyncHandler(async(req,res)=>{
    const updateMedi = await Medication.findByIdAndUpdate(req.params.id,
            req.body,
            {new: true}
        )
    if(!updateMedi){
        res.status(404);
        throw new Error("MedRecord not found");
    }
    res.status(200).json(updateMedi)
})



module.exports = {getMedication,addMedication,getMedicationById,deleteMed,updateMedication}