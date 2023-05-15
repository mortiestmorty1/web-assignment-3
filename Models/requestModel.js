const mongoose = require('mongoose');
const RequestSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,  
    },
    CNIC: { 
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
    },
    phoneNumber: { 
        type: String
    },
    city: {
        type: String,
        required: true,
    },
    bloodType: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Request', RequestSchema);