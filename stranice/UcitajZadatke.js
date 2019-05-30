function UcitajZadatke() {
    var ajax= new XMLHttpRequest();
    var odabranaVjezba=document.getElementsByName('sVjezbe')[1].value;
            ajax.onreadystatechange=function() {
                if(ajax.readyState==4 && ajax.status==200)
                {
                    var select = document.getElementsByName('fPoveziZadatak')[0].elements[1];
                    select[0]=null;
                    var zadaci = JSON.parse(ajax.responseText).zadaci;
                    var idVjezbe = JSON.parse(ajax.responseText).idVjezbe;
                //    var odabranaVjezba=document.getElementsByName('sVjezbe')[1].value;
                    for(var i=0;i<zadaci.length;i++)
                    {
                        var option = document.createElement('option');
                        option.innerHTML=zadaci[i].naziv;
                        select.appendChild(option);
                    }
                    
                }
                document.getElementsByName("fPoveziZadatak")[0].action = "http://localhost:8080/vjezba/" + idVjezbe + "/zadatak";
            }
            ajax.open("GET","http://localhost:8080/ucitajZadatke?vjezba="+odabranaVjezba,true);
            
            ajax.send();
           // document.getElementsByName("fPoveziZadatak")[0].action = "http://localhost:8080/vjezba/" + odabranaVjezba + "/zadatak";
          
}