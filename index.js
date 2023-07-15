const express = require('express')
const errorHandler = require('./middlewares/errorHandler');
const patientRoutes = require('./routes/patientRoutes');
const connectDB = require('./db/connect')
require('dotenv').config();
const app = express()

const port = process.env.PORT || 3000
app.use(express.json());

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`Server started on ${port}`)
        });
    }catch(err){
        console.log(err);
    }
};


app.use('/api/v1/patients', patientRoutes);
app.use(errorHandler);

start();