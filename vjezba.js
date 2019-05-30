const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Vjezba  = sequelize.define("vjezba",{
        id: {type: Sequelize.INTEGER, primaryKey:true},
        naziv: Sequelize.STRING,
        spirala:Sequelize.BOOLEAN

    })
    return Vjezba;
};