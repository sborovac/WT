
var GodineAjax = (function(){
    var konstruktor = function(divSadrzaj){
        var ajax= new XMLHttpRequest();
        //divSadrzaj=document.getElementById('glavniSadrzaj');
        ajax.onreadystatechange=function() {
            if(ajax.readyState==4 && ajax.status==200)
            {
                
                var sadrzaj  = ajax.responseText;
               // console.log(JSON.parse(sadrzaj));
                var text = JSON.parse(sadrzaj);   
                for(var i=0;i<text.length;i++)
                {
                    console.log(text[i]);
                    if(i>7)
                    { 
                       var novaVisinaSide=parseInt(document.getElementById('side').offsetHeight,10)+160;
                       document.getElementById('side').style.height=novaVisinaSide+'px';
                       var novaVisinaGS=parseInt(divSadrzaj.offsetHeight,10)+150;
                        divSadrzaj.style.height=novaVisinaGS+'px';
                    }
                    var item = document.createElement("div");
                    item.setAttribute('class','item');
                    var godina = document.createElement('p');
                    var nazivRepVjezbe =document.createElement('p');
                    var nazivRepSpirale = document.createElement('p');
                    if(!/20\d{2}\/20\d{2}$/.test(text[i].nazivGod))
                    {
                        var itemWidht = parseInt(item.offsetWidth,10)+350;
                        item.style.width=itemWidht+'px';
                    }
                    godina.innerHTML=text[i].nazivGod;
                    nazivRepVjezbe="Naziv Vjezbe: " + text[i].nazivRepVje+'<br/>';
                    nazivRepSpirale="Naziv Spirale: " + text[i].nazivRepSpi;
                    item.appendChild(godina);
                    item.innerHTML+=nazivRepVjezbe;
                    item.innerHTML+=nazivRepSpirale;
                // item.appendChild(nazivRepVjezbe);
                    //item.appendChild(nazivRepSpirale);
                    divSadrzaj.appendChild(item);
                }
            }
        }
        ajax.open("GET","http://localhost:8080/godine",true);
        ajax.setRequestHeader('Content-Type','application/json');
        ajax.send();

    return {
        osvjezi:function(){
            divSadrzaj.innerHTML=' ';
           var ajax= new XMLHttpRequest();
            ajax.onreadystatechange=function() {
                if(ajax.readyState==4 && ajax.status==200)
                {
                    divSadrzaj=document.getElementById('glavniSadrzaj');
                    var sadrzaj  = ajax.responseText;
                    //console.log(sadrzaj);
                    var text = JSON.parse(sadrzaj); 
                    for(var i=0;i<text.length;i++)
                    {
                        if(i>7)
                        { 
                        var novaVisinaSide=parseInt(document.getElementById('side').offsetHeight,10)+160;
                        document.getElementById('side').style.height=novaVisinaSide+'px';
                        var novaVisinaGS=parseInt(divSadrzaj.offsetHeight,10)+150;
                        divSadrzaj.style.height=novaVisinaGS+'px';
                        }
                        var item = document.createElement("div");
                        item.setAttribute('class','item');
                        var godina = document.createElement('p');
                        var nazivRepVjezbe =document.createElement('p');
                        var nazivRepSpirale = document.createElement('p');
                        if(!/20\d{2}\/20\d{2}$/.test(text[i].nazivGod))
                        {
                            var itemWidht = parseInt(item.offsetWidth,10)+350;
                            item.style.width=itemWidht+'px';
                        }
                        godina.innerHTML=text[i].nazivGod;
                        nazivRepVjezbe="Naziv Vjezbe: " + text[i].nazivRepVje+'<br/>';
                        nazivRepSpirale="Naziv Spirale: " + text[i].nazivRepSpi;
                        item.appendChild(godina);
                        item.innerHTML+=nazivRepVjezbe;
                        item.innerHTML+=nazivRepSpirale;
                    // item.appendChild(nazivRepVjezbe);
                        //item.appendChild(nazivRepSpirale);
                        divSadrzaj.appendChild(item);
                    }
                }
            }
            ajax.open("GET","http://localhost:8080/godine",true);
            ajax.setRequestHeader('Content-Type','application/json');
            ajax.send();
        }
    }
    }
    return konstruktor;
    }());
   module.exports=GodineAjax;