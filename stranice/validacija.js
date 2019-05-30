var Validacija=(function(){
    var regexIme = /(^[A-Z](\'?[a-z]+\'?[a-z]*(\s|\-))([A-Z](\'?[a-z]+\'?[a-z]*)(\s|-)?){0,4}$)|(^([A-Z](\'?[a-z]+)+)$)/;
    var regexGodina = /20\d{2}\/20\d{2}$/;
    var regexIndex=/(1[4-9]|20){2}\d$/;
    var regexNaziv=/^\w+(\d|\/|\|-|"|'|!|\?|:|;|,)*([a-z]|\d)$/;
    var regexURL =/(http|https|ftp|ssh):\/\/\w+(\.(?=\w+)\w*)*\/?(\/(?=\w+)\w*)*(\?(?=\w+=\w+(&\w+=\w+)*)(\w+=\w+(&\w+=\w+)*)*)*$/;
    var regexPass =/^(?=.{8}$)(?=(.*[A-Z]){2})(?=(.*[a-z]){2})(?=(.*[0-9]){2}).*$/;
    var godina;
    var konstruktor=function(divElementPoruke){
      var paragraf = document.createElement("p");
      paragraf.style.backgroundColor="orange"
     divElementPoruke.appendChild(paragraf);
    return{
    ime:function(inputElement){
        inputElement.style.backgroundColor="";
        if(!regexIme.test(inputElement.value))
         {
            inputElement.value="";
            inputElement.style.backgroundColor="red";
             var text =paragraf.innerHTML;
             if(text=="") { text="Polja koja nisu validna: ";}
             else text=paragraf.innerHTML;
             if(text.charAt(text.length-2)=='!') { text = text.replace(/!\s$/gi,', ');  text+="ime! ";}
             else text+="ime! ";   
             paragraf.innerHTML=text;           
         }
        
    },
    godina:function(inputElement){
       
        if(!regexGodina.test(inputElement.value))
        {
           
            var text = paragraf.innerHTML;
             if(text=="") text="Polja koja nisu validna: ";
             else text=paragraf.innerHTML;
             if(text.charAt(text.length-2)=='!') { text = text.replace(/!\s$/gi,', ');  text+="godina! ";}
             else text+="godina! ";   
             paragraf.innerHTML=text;     
        }
        else{
            godina=inputElement.value.split("/");
            if(godina[1]-godina[0]!=1)
            {
               
                var text = paragraf.innerHTML;
                if(text=="") text="Polja koja nisu validna: ";
                else text=paragraf.innerHTML;
                if(text.charAt(text.length-2)=='!') { text = text.replace(/!\s$/gi,', ');  text+="godina! ";}
                else text+="godina! ";   
                paragraf.innerHTML=text;     
            }
        }

    },
    repozitorij:function(inputElement,regex){
        if(!regex.test(inputElement.value))
        {
            
            var text = paragraf.innerHTML;
             if(text=="") text="Polja koja nisu validna: ";
             else text=paragraf.innerHTML;
             if(text.charAt(text.length-2)=='!') { text = text.replace(/!\s$/gi,', ');  text+="repozitorij! ";}
             else text+="repozitorij! ";   
             paragraf.innerHTML=text;      
        }
    },
    index:function(inputElement){
        inputElement.style.backgroundColor="";
        if(!regexIndex.test(inputElement.value))
        {
            
            inputElement.value="";
            inputElement.style.backgroundColor="red";
            var text = paragraf.innerHTML;
             if(text=="") text="Polja koja nisu validna: ";
             else text=paragraf.innerHTML;
             if(text.charAt(text.length-2)=='!') { text = text.replace(/!\s$/gi,', ');  text+="index! ";}
             else text+="index! ";   
             paragraf.innerHTML=text;      
        }
    },
    naziv:function(inputElement){
        inputElement.style.backgroundColor="";
        if(inputElement.value.length < 3 || !regexNaziv.test(inputElement.value))
        {
            inputElement.value="";
            inputElement.style.backgroundColor="red";
            var text = paragraf.innerHTML;
             if(text=="") text="Polja koja nisu validna: ";
             else text=paragraf.innerHTML;
             if(text.charAt(text.length-2)=='!') { text = text.replace(/!\s$/gi,', ');  text+="naziv! ";}
             else text+="naziv! ";   
             paragraf.innerHTML=text;      
        }
    },
    password:function(inputElement){
        inputElement.style.backgroundColor="";
        if(!regexPass.test(inputElement.value))
         {
            inputElement.value="";
            inputElement.style.backgroundColor="red";
            var text = paragraf.innerHTML;
             if(text=="") text="Polja koja nisu validna: ";
             else text=paragraf.innerHTML;
             if(text.charAt(text.length-2)=='!') { text = text.replace(/!\s$/gi,', ');  text+="password! ";}
             else text+="password! ";   
             paragraf.innerHTML=text;         
         }
           
                                          
            

    },
    url:function(inputElement){
        inputElement.style.backgroundColor="";
        if(!regexURL.test(inputElement.value))
        {
            inputElement.value="";
            inputElement.style.backgroundColor="red";
            var text = paragraf.innerHTML;
             if(text=="") text="Polja koja nisu validna: ";
             else text=paragraf.innerHTML;
             if(text.charAt(text.length-2)=='!') { text = text.replace(/!\s$/gi,', ');  text+="url! ";}
             else text+="url! ";   
             paragraf.innerHTML=text;    
        }
    }
    }
    }
    return konstruktor;
    }());