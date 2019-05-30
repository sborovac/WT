var ZadaciAjax = (function(){
    var konstruktor = function(callbackFn){
      var poslano=false;        
    return {
    dajXML:function(){ 
        if(!poslano) {
            poslano=true;
        var ajax=new XMLHttpRequest();
        
        
        ajax.onreadystatechange = function() {
            if(ajax.readyState==4 && ajax.status==200) 
            {
                poslano=false;
                callbackFn(ajax.responseText);
            }
        }
        ajax.timeout=20000;
        ajax.ontimeout = function(){poslano=false;}
        ajax.open("GET","http://localhost:8080/zadaci",true);
        ajax.setRequestHeader('Accept','application/xml');
       ajax.send()
        }
        else callbackFn({greska:'Već ste uputili zahtjev'})
    },
    dajCSV:function(){
        if(!poslano) {
            poslano=true;
        var ajax=new XMLHttpRequest();
       
        
        ajax.onreadystatechange = function() {
            if(ajax.readyState==4 && ajax.status==200) 
            {
                poslano=false;
                callbackFn(ajax.responseText);
            }
        }
        ajax.timeout=2000;
        ajax.ontimeout = function(){poslano=false;}
        ajax.open("GET","http://localhost:8080/zadaci",true);
        ajax.setRequestHeader('Accept','text/csv');
      ajax.send()
        }
        else callbackFn({greska:'Već ste uputili zahtjev'})
    },
    dajJSON:function(){
        if(!poslano) {
        poslano=true;
        var ajax=new XMLHttpRequest();
     
       
        ajax.onreadystatechange = function() {
            if(ajax.readyState==4 && ajax.status==200) 
            {
                poslano=false;
                callbackFn(ajax.responseText);
            }
        }
        ajax.timeout=2000;
        ajax.ontimeout = function(){poslano=false;}
        ajax.open("GET","http://localhost:8080/zadaci",true);
        ajax.setRequestHeader('Accept','application/json');
        ajax.send()
        }
        else callbackFn({greska:'Već ste uputili zahtjev'})
    }
    }
    }
    return konstruktor;
    }());
    module.exports=ZadaciAjax;