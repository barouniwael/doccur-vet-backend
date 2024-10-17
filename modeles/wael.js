const Sequelize = require('sequelize');

const db = require ("../database/sql")


const wael = db.sequelize2.define(
    "wael",
    {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement:true,
            allowNumm:false,
            primaryKey:true
        },
        email:{
            type: Sequelize.STRING,
           
        },

    }
    
    
    );

    module.exports= wael;
    
