const app = require("express").Router();
const userSchema = require("../models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")


// registerUser controller
const registerUser = async (req, res) => {

    // check username exist or not
    const usernameExist = await userSchema.findOne({ username: req.body.username });
    if (usernameExist) return res.status(400).json({
        status: 'username exists'
    });

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new userSchema({
        username: req.body.username,
        fullname: req.body.fullname,
        password: hashPassword,
    });
    try {
        const saveUser = await user.save();
        res.status(201).json({
            username: saveUser.username,
            fullname: saveUser.fullname,
            status: "success"
        });
    }
    catch (err) {
        res.status(400).json({
            status: "error"
        });
    }
};

// viewUsers controller
const viewUsers = async (req, res) => {
    try {
        const userDetails = await userSchema.find();
        return res.status(200).json(userDetails);
    }
    catch (error) {
        return res.status(404).json({ status: 'failed' });
    }
};

// updateUser controller
const updateUser = async (req, res) => {

    // you need to pass _id as params
    const _id = req.params.id;
    const { username, fullname } = req.body;

    // validating mongoose objectID
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({ status: 'failed' });
    
    // check password field is present or not
    if (req.body.password)
        return res.status(404).json({ status: 'password cannot be updated' });
    
    // checking username is same or not
    const usernameExist = await userSchema.findOne({ username: username });
    if (usernameExist) return res.status(400).json({
        status: 'username exists'
    });
    await userSchema.findByIdAndUpdate(_id, { username: username, fullname: fullname }, { new: true });
    res.status(200).json({ status: 'success' });
};

// deleteUser controller
const deleteUser = async (req, res) => {
    const _id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({ status: 'failed' });
    
    // checking ID is valid or not
    const data = await userSchema.findById({ _id: _id });
    if (!data) return res.status(400).json({
        status: "invalid ID"
    });
    await userSchema.findByIdAndRemove(_id);
    res.status(200).json({ status: 'success' });
}

module.exports = {
    registerUser,
    viewUsers,
    updateUser,
    deleteUser
};