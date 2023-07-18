import Medication from "../models/medicationsModel";

module.exports.addMedication = async (req, res) => {

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

module.exports.getMedication = async (req, res) => {
    try {
        const medications = await Medication.find();
        res.json({ medication: medications, mssg: "medication fetched successfully" });
    } catch (error) {
        res.status(400).json({ mssg: "eroor in getting medications" })
        console.log(error)
    }
}

module.exports.getMedicationById = async (req, res) => {
    const { id: MedicineId } = req.params.id;
    try {
        const medicine = await Medication.findById(MedicineId);

        res.json({ medication: medicine, mssg: `medicine fetched for ${MedicineId} ` })

    } catch (error) {
        res.status(400).json({ mssg: "eroor in getting medications" })
        console.log(error)
    }
}

module.exports.deleteMed = async (req, res) => {
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
}