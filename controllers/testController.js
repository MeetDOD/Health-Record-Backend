const asyncHandler = require('express-async-handler');
const {Test} = require('../controllers/testController') 
const getAllTest = asyncHandler(async (req,res) => {

    const tests = await Test.find({});
    res.status(200).json({"tests": tests, "msg": "Success"});
});

const addTest = asyncHandler(async(req,res)=>{

    const {name,doctor,patient,result} = req.body;
    if(!name || !doctor || !patient ||!result){
        res.status(400);
        throw new Error("all fields are required");
    }

    const test = await Test.create({name,doctor,patient,result});
    res.status(200).json({"test": test,"msg": "All data received"});
});

const getSingleTest = asyncHandler(async(req,res)=>{
    const {id: testId} = req.params;
    const test = await Test.findById({_id: testId});
    if(!test){
        res.status(404);
        throw new Error("Test not found");
    }
    res.status(200).json({"test": test, "msg": "Data received"});
});

const deleteTest = asyncHandler(async(req,res)=>{
    const {id: testId} = req.params;
    const test = await Test.findByIdAndDelete({_id: testId});
    if(!test){
        res.status(404);
        throw new Error("Test not found"); 
    }
    res.status(200).json({"msg": "Deleted"})
    
})


module.exports = {getAllTest,getSingleTest,deleteTest,addTest};