const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Godina  = sequelize.define("godina",{
        id: {type: Sequelize.INTEGER, primaryKey:true},
        nazivGod: Sequelize.STRING,
        nazivRepSpi:Sequelize.STRING,
        nazivRepVje: Sequelize.STRING
    })
    
    return Godina;
};