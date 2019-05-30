const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2018","root","root",{host:"127.0.0.1",dialect:"mysql",logging:true});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.student = sequelize.import(__dirname+'/student.js');
db.godina = sequelize.import(__dirname+'/godina.js');
db.zadatak = sequelize.import(__dirname+'/zadatak.js');
db.vjezba = sequelize.import(__dirname+'/vjezba.js');

// Veza 1-n 
//db.student.hasMany(db.godina,{as:'godina'});
db.godina.hasMany(db.student,{as:'studenti',foreignKey:'studentGod'});

// Veza n-m 
//godina-vjezba
db.godinaVjezba=db.godina.belongsToMany(db.vjezba,{as:'vjezba',through:'godina_vjezba',foreignKey:'idGodina'});
db.vjezba.belongsToMany(db.godina,{as:'godine',through:'godina_vjezba',foreignKey:'idVjezba'});

//vjezba-zadatak
db.vjezbaZadatak = db.vjezba.belongsToMany(db.zadatak,({as:'zadaci', through:'vjezba_zadatak',foreignKey:'idVjezba'}));
db.zadatak.belongsToMany(db.vjezba,({as:'vjezbe',through:'vjezba_zadatak',foreignKey:'idZadatak'}));

module.exports=db;


