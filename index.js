const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log(`MongoDB connection established`);
});

const userRoute = require("./routes/user")

app.use(express.json());
app.use(cors());
app.use("/api", userRoute);

app.listen(PORT, () => {
    console.log(`Server is up and running at port:${PORT}`);
});