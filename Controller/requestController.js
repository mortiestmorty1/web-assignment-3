const Request = require('../Models/requestModel');
const Admin = require('../Models/Admin');
const jwt = require('jsonwebtoken');

let createRequest = (req, res) => { 
    console.log("Create Request method in Request Controller called")

    let request = new Request({
        name: req.body.name,
        CNIC: req.body.CNIC,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        city: req.body.city,
        bloodType: req.body.bloodType,
    })

    request.save()
    .then((request) => {
        res.status(200).send({message: "Request created successfully!", request: request})
    })
    .catch((err) => {
        res.status(400).send({message: "Error occurred while creating Request", error: err})
    })
}

let getAllRequests = (req, res) => { 
    console.log("Get All Requests method in Request Controller called")

    Request.find()
    .then((requests) => {
        res.status(200).send({message: "Requests retrieved successfully!", requests: requests})
    })
    .catch((err) => {
        res.status(400).send({message: "Error occurred while retrieving Requests", error: err})
    })
}

let deleteRequest = (req, res) => { 
    console.log("Delete Request method in Request Controller called")

    let id = req.params.id
    Request.findByIdAndDelete(id)
    .then((request) => {
        res.status(200).send({message: "Request deleted successfully!", request: request})
    })
    .catch((err) => {
        res.status(400).send({message: "Error occurred while deleting Request", error: err})
    })
}

let updateRequest = (req, res) => {  
    let {name, CNIC, email, phoneNumber, city, bloodType} = req.body;
    let id = req.params.id;

    Request.findByIdAndUpdate(id, {name, CNIC, email, phoneNumber, city, bloodType})
    .then((request) => {
        res.status(200).send({message: "Request updated successfully!", request: request})
    }
    )   
    .catch((err) => {
        res.status(400).send({message: "Error occurred while updating Request", error: err})
    }
    )    
}

module.exports = {createRequest, getAllRequests, deleteRequest, updateRequest};