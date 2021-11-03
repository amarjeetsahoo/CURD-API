const express = require("express");
const { registerUser,viewUsers,updateUser,deleteUser } = require("../controllers/user");

const app = express.Router();

app.post("/user", registerUser); // create a new user
app.get("/user", viewUsers); // get all users details
app.put("/user/:id", updateUser); // update a user details
app.delete("/user/:id", deleteUser); // delete a user

module.exports = app;