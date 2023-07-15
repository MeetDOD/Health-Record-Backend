const mongoose = require('mongoose');
const Docs =require("../models/doctorModel");

const getAllDoc = async (req,res) => {

    let docs;

    try{
        docs = await Docs.find({});
        console.log(docs);
    }catch(er){
        return console.log(er);
    }

    if(!docs){
        return res.status(500).json({ message : "No Doctor Found"})
    }else{
        return res.status(200).json({ docs })
    }
}

const addDoc = async (req,res) => {

    const {fname,lname,specialization,contact_info} = req.body;

    if(!fname && fname.trim() === "" && 
        !lname && lname.trim() === "" &&
        !specialization && specialization.trim() === "" &&
        !contact_info && contact_info.trim()
    ){
        return res.status(422).json({message : "Invalid data, Please Enter valid Data"}) 
    }

    try{
        const newDoctor = await Docs.create({
            fname,
            lname,
            specialization,
            contact_info
        });
        res.status(201).json(newDoctor);
        console.log('Successfully Created Docoter')
    }catch(er){
        return console.log(er);
    }
}

const getDocById = async (req,res) => {
    const id = req.params.id;

    let docs;

    try{
        docs = await Docs.findById(id);
    }catch(er){
        console.log(er)
    }

    if(!docs){
        return res.status(404).json({  message : "No Docotor exist with such ID" })
    }else{
        return res.status(200).json({ docs })
    }
}

const updateDoc = async (req,res) => {
    
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

    try{
        docs = await Docs.findByIdAndUpdate(id,{
            fname,
            lname,
            specialization,
            contact_info
        });
    }catch(er){
        return console.log(er);
    }

    if(!docs){
        return res.status(500).json({ message : "Unable to update the Doctor" });
    }else{
        return res.status(200).json({ message : "Doctor Updated Successfully" });
    }
}

const deleteDoc = async (req,res) => {
    
    const id = req.params.id;
    let docs;

    try{
        docs = await Docs.findByIdAndRemove(id);
    }catch(er){
        return console.log(er);
    }

    if(!docs){
        return res.status(500).json({ message : "Unable to delete Doctor"});
    }else{
        return res.status(201).json({ message : "Deleted Successfully" });
    }
}

module.exports = {getAllDoc, addDoc,getDocById,updateDoc,deleteDoc};