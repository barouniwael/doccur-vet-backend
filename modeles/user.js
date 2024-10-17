const Sequelize =require("sequelize");


const { DataTypes } = require('sequelize');
const sequelize = require('../database/sql');

const User= sequelize.sequelize2.define(
    'user',
   {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    email:{
        type: Sequelize.STRING,
       
    },
    name:{
        type: Sequelize.STRING,
        
    },
    phone:{
        type: Sequelize.INTEGER,
       
    },
    password:{
        type: Sequelize.STRING,
      
    },
    isActive:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
        
    },
    role:{
        type: Sequelize.STRING,
        defaultValue: "client"
    },
    
    verificationcode:{
        type: Sequelize.INTEGER,
    }
   })
   module.exports = User;