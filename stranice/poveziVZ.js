const db = require('./db.js')
function PoveziZadatak(){
    var ajax = new XMLHttpRequest();
   
    var vjezba = document.getElementsByName('sVjezba')[0].value;
    db.vjezba.findOne({where: {naziv:vjezba}}).then(function(trazenaVjezba){
        console.log(trazenaVjezba.id);
       /* document.getElementsByName("fPoveziZadatak")[0].action = "http://localhost:8080/vjezba/" + trazenaVjezba.id + "/zadatak";
        ajax.open("POST","http://localhost:8080/vjezba/:idVjezbe/zadatak",true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send();*/
    })
   // var zadatak = document.getElementsByName('fPoveziZadatak')[0].elements[1];
    //console.log(vjezba.value);
    
    
}