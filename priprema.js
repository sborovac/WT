const db = require('./db.js')
db.sequelize.sync({force:true}).then(function(){

}).catch(function(err){
    if(err)console.log(err);
})

