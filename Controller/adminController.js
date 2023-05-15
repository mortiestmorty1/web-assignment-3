const Admin = require('../Models/Admin')
const jwt = require('jsonwebtoken')
const Donor = require('../Models/Donor')

let signup = (req, res) => { //This will not be implemented in frontend. It is here so that we can set up a default admin account using POSTMAN
    console.log("Sign Up method in Admin Controller called")

    Admin.findOne({email: req.body.email}) //First, I will check if the email already exists. If it does, I will not create the account
    .then((existingDonor) => {

        if (existingDonor)
        {
            return res.status(400).send({message: "Administrator Account already exists with this email!"})
        }

        let admin = new Admin({
            name: req.body.name,
            CNIC: req.body.CNIC,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: req.body.password,
        })

        admin.save()
        .then((admin) => {
            res.status(200).send({message: "Admin Account created successfully!", admin: admin})
        })
        .catch((err) => {
            res.status(400).send({message: "Error occurred while creating Donor Account", error: err})
        })
        
    })
    .catch((err) => {
        console.log("Error occurred while checking if the email already exists in the database")
    })

}

let login = (req, res) => {
    console.log("Login method in Admin Controller called")

    let email = req.body.email
    let password = req.body.password
    let secretKey = process.env.SECRET_KEY
    Admin.findOne({email: email})
    .then((admin) => {
        if (admin)
        {
            if (admin.password === password)
            {
                let token = jwt.sign({email: email, role: 'Admin'}, secretKey, {expiresIn: '1h'}) //the email is now included in the token as well as the role since login is successful
                res.status(200).send({message: "Login Successful", token: token}) 
            }

            else
            {
                res.status(401).send({message: "The password is incorrect"})
            }
        }

        else
        {
            res.status(404).send({message: "No Admin Account exists with this email"})
        }
        
    })
    .catch((err) => {
        res.status(404).send({message: "An error occurred during login", error: err.message})
    })

}

//For update donor route, I will assume that the frontend will pass on an updated donor object. Email will not be allowed to be updated as it acts as the primary key you can say
let updateDonor = (req, res) => {

    const updatedDonor = {
        name: req.body.name,
        CNIC: req.body.CNIC,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password,
        city: req.body.city,
        bloodGroup: req.body.bloodGroup,
    }

    Donor.findOneAndUpdate({email: req.body.email}, updatedDonor, {new: true})
    .then((donor) => {
        if (!donor)
        {
            return res.status(404).send({message: "No donor account exists with this email"})
        }

        else
        {
            res.status(200).send({message: "Donor account updated successfully!", donor: donor})
        }
    })
}

let deleteDonor = (req, res) => {
    Donor.findOneAndDelete({email: req.body.email})
    .then((donor) => {
        if (!donor)
        {
            return res.status(404).send({message: "No donor account exists with this email"})
        }

        else
        {
            res.status(200).send({message: "Donor account deleted successfully!", donor: donor})
        }
    })
}

module.exports = {
    signup,
    login,
    updateDonor,
    deleteDonor
}
