const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const requestRoute = require('./Routes/requestRoute');
const adminRoute = require('./Routes/AdminRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/request', requestRoute);
app.use('/admin', adminRoute);

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Database connection successful")
}).catch((err) => {
    console.log("Error occurred while connecting to the database", err)
})

app.get('/', (req, res) => {
    res.send("Welcome to the Blood Bank API")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

