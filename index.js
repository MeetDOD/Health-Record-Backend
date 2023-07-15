const express = require('express')
const errorHandler = require('./middlewares/errorHandler');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
require('dotenv').config();
const cors = require('cors');
const connection = require('./db/databaseConnect')
const app = express();

connection();
app.use(express.json());
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/doctors',doctorRoutes)
app.use(errorHandler);
app.listen(5000, () => {
    console.log('Converted RAM to SERVER');
})