const Sequelize =require("sequelize");


const sequelize = require('../database/sql');


const Appointement= sequelize.sequelize2.define(
    'appointement',
   {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNumm:false,
        primaryKey:true
    },
    nom:{
        type: Sequelize.STRING,
        allowNull:false,

    },
    prenom:{
        type: Sequelize.STRING,
        // allowNull:false,

    },
    date:{
        type: Sequelize.DATE, 
        // allowNull:false
    },
    time:{
        type: Sequelize.TIME
    },
    animalName:{
        type: Sequelize.STRING
    },
    phone:{
        type: Sequelize.INTEGER
    },
    email:{
        type: Sequelize.STRING
    },
    espece:{
        type:Sequelize.STRING
    },
    sexe:{
        type:Sequelize.STRING
    },

    motif:{
        type: Sequelize.STRING,
    },
   
}
);


module.exports = Appointement;