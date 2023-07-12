const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

const port = process.env.PORT || 3000

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
})