const Sequelize =require("sequelize");


const { DataTypes } = require('sequelize');
const sequelize = require('../database/sql');

const Schedule= sequelize.sequelize2.define(
    'schedule',
   {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    dayOfWeek  :{
        type: Sequelize.STRING,
       
    },
    timeSlots:{
        type: Sequelize.JSON,
        
    },
  
   })
   module.exports = Schedule;