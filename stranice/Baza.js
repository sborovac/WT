
var Baza = (function(){
    var konstruktor = function(){  
    return {
        godineFP:function(){
            var ajax= new XMLHttpRequest();
            ajax.onreadystatechange=function() {
                if(ajax.readyState==4 && ajax.status==200)
                {
                    var selectFPostojeca = document.getElementsByName('fPostojeca')[0].elements[0];
                    var godine = JSON.parse(ajax.responseText);
                    for(var i=0;i<godine.length;i++)
                    {
                        var option = document.createElement('option');
                        option.innerHTML=godine[i].nazivGod;
                        selectFPostojeca.appendChild(option);

                    }
                    
                }
            }
            ajax.open("GET","http://localhost:8080/ucitajGodine",true);
            ajax.send();
        },
        vjezbeFPostojeca:function(){

            var ajax= new XMLHttpRequest();
            ajax.onreadystatechange=function() {
                if(ajax.readyState==4 && ajax.status==200)
                {
                    var select = document.getElementsByName('fPostojeca')[0].elements[1];
                    var vjezbe = JSON.parse(ajax.responseText);
                    for(var i=0;i<vjezbe.length;i++)
                    {
                        var option = document.createElement('option');
                        option.innerHTML=vjezbe[i].naziv;
                        select.appendChild(option);
                    }
                    
                }
            }
            ajax.open("GET","http://localhost:8080/ucitajVjezbe",true);
            ajax.send();
            
        },
        godineFN:function(){
            var ajax= new XMLHttpRequest();
            ajax.onreadystatechange=function() {
                if(ajax.readyState==4 && ajax.status==200)
                {
                    var selectFNova= document.getElementsByName('fNova')[0].elements[1];
                    var godine = JSON.parse(ajax.responseText);
                    for(var i=0;i<godine.length;i++)
                    {
                        var option = document.createElement('option');
                        option.innerHTML=godine[i].nazivGod;
                        selectFNova.appendChild(option);

                    }
                    
                }
            }
            ajax.open("GET","http://localhost:8080/ucitajGodine",true);
            ajax.send();
        },
        vjezbePZ:function() {
            var ajax= new XMLHttpRequest();
            ajax.onreadystatechange=function() {
                if(ajax.readyState==4 && ajax.status==200)
                {
                    var select = document.getElementsByName('fPoveziZadatak')[0].elements[0];
                    var vjezbe = JSON.parse(ajax.responseText);
                    for(var i=0;i<vjezbe.length;i++)
                    {
                        var option = document.createElement('option');
                        option.innerHTML=vjezbe[i].naziv;
                        select.appendChild(option);
                    }
                    
                }
            }
            ajax.open("GET","http://localhost:8080/ucitajVjezbe",true);
            ajax.send();
        }
       

    }
    }
    return konstruktor;
    }());