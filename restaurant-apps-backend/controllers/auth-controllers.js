// Importing required modules
const { MongoClient, ObjectId } = require("mongodb");
// const userModel = require('../models/userModel');
const PRIVATE_KEY = "98450";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const OwnerSchema = require("../models/ownerSchema");


async function loginOwner(req, res, next) {
    const { email, password } = req.body;

    // Check if the user with provided email and password exists in the database

    const itemFindFromUserList = await OwnerSchema.findOne({ email });

    // If the user doesn't exist in the list, send an error response to the client
    if (!itemFindFromUserList) {
        return res.status(401).send({ success: false, data: "Invalid credentials" });
    }

    // If the password doesn't match with the stored password for the user, send an error response to the client
       if (!bcrypt.compareSync(password, itemFindFromUserList.password)) {
           return res.status(401).send({ success: false, data: "Invalid credentials" });
       } 

    /* if (password !== itemFindFromUserList.password) {
        return res.status(401).send({ success: false, data: "Password Invalid credentials" });
    } */

    // Generate a JWT token using the owner's information and send it back to the client
    const token = jwt.sign({
        name: itemFindFromUserList.firstName,
        email: itemFindFromUserList.email,

        // Add other information to be included in the JWT token
    }, PRIVATE_KEY);


    // Send a success response to the client with the generated token
    res.status(200).send({ success: true, token, id: itemFindFromUserList._id, name: itemFindFromUserList.firstName });
}



module.exports = { loginOwner };