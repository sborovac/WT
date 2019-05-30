var listaStudenata;
function myFunction() {
   var ajax = new XMLHttpRequest();
   var godina = document.getElementsByTagName("form")[0].elements[0].value;
   var podaci = {
       "godina": godina,
       "studenti":JSON.stringify(listaStudenata)
      
   }
  
   ajax.onreadystatechange=function() {
       if(ajax.readyState==4 && ajax.status==200)
       {
         alert(JSON.parse(JSON.stringify(ajax.responseText)));
       }
   }
   ajax.open("POST","http://localhost:8080/student",true);
   ajax.setRequestHeader("Content-Type", "application/json");
   //ajax.send("studenti="+JSON.stringify(podaci));
   ajax.send(JSON.stringify(podaci));
           
            
        
    
}



function KreirajBitbucket(){
    var bb = new Bitbucket(2,2);
    listaStudenata = bb.ucitaj(1,1,1);
    document.getElementsByTagName("input")[3].disabled=false;
    
    document.getElementsByTagName("input")[3].onclick = function(){ myFunction()}  
    

    console.log(listaStudenata);
    //document.getElementById('greskaPrvaForma').innerHTML = listaStudenata;
}