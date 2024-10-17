const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");
const router = require("router");
const bcrypt = require("bcrypt");
//models
// const appointements = require("./modeles/appointement")
//dB connection
const sequelize = require("./database/sql");
sequelize.sequelize2.sync({ alter: true }).then((res)=>{
    console.log("db sync");
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const adminRoutes = require('./routes/admin');
const doctorRoutes = require('./routes/doctor');
const clientRoutes = require('./routes/client');
const authRoutes = require('./routes/auth');



app.use('/admin', adminRoutes);
app.use('/doctor',doctorRoutes);
app.use('/client',clientRoutes);
app.use('/auth',authRoutes);





app.listen("3000",()=>{
    console.log("server running");
})
module.exports = app;