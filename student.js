const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Student  = sequelize.define("student",{
        id: {type: Sequelize.INTEGER, primaryKey:true},
        imePrezime: Sequelize.STRING,
        index:Sequelize.STRING
    });
    return Student;
};

