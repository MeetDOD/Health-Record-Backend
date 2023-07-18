const asyncHandler = require('express-async-handler')
const Doctor = require('../models/doctorModel')

const getAllDoc = asyncHandler( async (req,res) => {

    
    const docs = await Doctor.find({}).lean();
    return res.status(200).json({ docs })
    
})

const addDoc = asyncHandler( async (req,res) => {

    const {fname,lname,specialization,contact_info} = req.body;

    if(!fname && fname.trim() === "" && 
        !lname && lname.trim() === "" &&
        !specialization && specialization.trim() === "" &&
        !contact_info && contact_info.trim()
    ){
        res.status(422);
        throw new Error("Invalid data")
    }

    
        const newDoctor = await Doctor.create({
            fname,
            lname,
            specialization,
            contact_info
        });
        res.status(201).json(newDoctor);
        
   
});

const getDocById =asyncHandler( async (req,res) => {
    const id = req.params.id;

    let docs;

   
    docs = await Doctor.findById(id).populate('medRecords');
    

    if(!docs){
        res.status(404)
        throw new Error("No doctor exists with such id")
    }
    
    return res.status(200).json({ docs })
    
})

const updateDoc = asyncHandler( async (req,res) => {
    
    const id = req.params.id;
    const {fname,lname,specialization,contact_info} = req.body;

    if(!fname && fname.trim() === "" && 
    !lname && lname.trim() === "" &&
    !specialization && specialization.trim() === "" &&
    !contact_info && contact_info.trim()
    )
    {
    return res.status(422).json({message : "Invalid data, Please Enter valid Data"})
    };

    let docs;

    
    docs = await Doctor.findByIdAndUpdate(id,{
            fname,
            lname,
            specialization,
            contact_info
        });
    

    if(!docs){
        res.status(500);
        throw new Error("Doctor with such id does not exists");
    }else{
        return res.status(200).json({ message : "Doctor Updated Successfully" });
    }
});

const deleteDoc =asyncHandler(async (req,res) => {
    
    const id = req.params.id;


   
    const docs = await Doctor.findByIdAndRemove(id);
    

    if(!docs){
        res.status(500);
        throw new Error("Doctor with such id does not exists");
    }
    
    return res.status(201).json({ message : "Deleted Successfully" });

})

module.exports = {getAllDoc, addDoc,getDocById,updateDoc,deleteDoc};