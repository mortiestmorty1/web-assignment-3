const express = require('express');
const router = express.Router();
const RequestController = require('../Controller/requestController')

const isAuthorized = (req, res, next) => {
    const token = req.headers.authorization
 
    if (!token)
    {
         return res.status(403).send({message: "You are not allowed to perform this action"})
    }
 
    console.log("The token is: ", token)
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        console.log("The token is for: ", req.user.email)
        
        if (req.user.role == "Admin")
        {
            next();
        }
    
        else
        {
            return res.status(403).send({message: "You must be an administrator to access this route"})
        }
}

router.post('/createRequest', RequestController.createRequest);
router.get('/getAllRequests', RequestController.getAllRequests);
router.delete('/deleteRequest/:id', RequestController.deleteRequest);
router.put('/updateRequest/:id', isAuthorized, RequestController.updateRequest);

module.exports = router;