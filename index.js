const express = require('express')
const errorHandler = require('./middlewares/errorHandler');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const testRoutes = require('./routes/testRoutes');
const medRecRoutes = require('./routes/medRecRoutes')
require('dotenv').config();
const cors = require('cors');
const connection = require('./db/databaseConnect')
const app = express();

connection();
app.use(express.json());
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/doctors',doctorRoutes);
app.use('/api/v1/tests',testRoutes);
app.use('/api/v1/med_records',medRecRoutes)
app.use(errorHandler);
app.listen(5000, () => {
    console.log('Converted RAM to SERVER');
})