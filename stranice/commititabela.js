var CommitTabela=(function(){
   
    var row;
    var brojKolona;
    var brojCommita;
    var konstruktor=function(divElement,brojZadataka){
        var tbl = document.createElement("table");        
        var tblBody = document.createElement("tbody");
       
        var linkText;
       for(var i=0; i<=brojZadataka; i++)
	{
        var tr = document.createElement("tr");
       
		for(var j=0; j<2;j++){
            var td = document.createElement("td");
           if(i==0 && j==0) { td.colSpan=1;  td.appendChild(document.createTextNode("Naziv Zadatka")); td.style.backgroundColor="#9999ff";}
            if(i==0 && j == 1 ) 
            {
                td.colSpan=1;
                td.appendChild(document.createTextNode("Commiti"));
                td.style.backgroundColor="#9999ff";
            }
            if(i>0 && j==0) td.appendChild(document.createTextNode("Zadatak"+ i.toString()));      
            //if(i>0 && j>1) tr.appendChild(td);
            td.colSpan=1;
            tr.appendChild(td);
        }
       
        tblBody.appendChild(tr);
    }
    tblBody.appendChild(tbl);
    tbl.setAttribute("id", "tabela");    
    divElement.appendChild(tblBody);

      

    return{
        dodajCommit: function (rbZadatka,url){
           
            row = document.getElementsByTagName("tr")[rbZadatka];
            for(var i=1;i<row.cells.length;i++)
            {
                if(row.cells[i].innerHTML=="" && row.cells[i].colSpan==1)
                {
                    if(i==row.cells.length-1) row.cells[i].innerHTML='<a href="'+ url +'">' + i.toString() +'</a>';  
                    else 
                    {
                        if(i==1) brojCommita=1;
                        else brojCommita=parseInt(row.cells[i-1].getElementsByTagName('a')[0].text,10)+1;
                        row.cells[i].innerHTML='<a href="'+ url +'">' + brojCommita.toString() +'</a>'; 

                    }
                    break;
                }
                else if(row.cells[i].colSpan!=1)
                {
                    span = row.cells[i].getAttribute('colspan');
                    row.cells[i].setAttribute('colspan','1');
                    if(i==1) brojCommita=1;
                    else brojCommita=parseInt(row.cells[i-1].getElementsByTagName('a')[0].text,10)+1;
                    row.cells[i].innerHTML='<a href="'+ url +'">' + brojCommita.toString() +'</a>'; 
                    td = document.createElement("td");
                    td.colSpan=span-1;
                    row.appendChild(td);
                    break;
                }
                else if(i==row.cells.length-1)
                {
                    
                    brojCommita=parseInt(row.cells[i].getElementsByTagName('a')[0].text,10)+1;
                    row.insertCell(i+1);                    
                    row.cells[i+1].innerHTML='<a href="'+ url +'">' + brojCommita.toString() +'</a>';                                              
                    for(var j=0; j<tblBody.rows.length;j++)
                    {
                        var kraj = tblBody.rows[j].cells.length-1;
                        if(j==rbZadatka) continue;
                        var check = document.getElementsByTagName("tr")[j].cells[kraj].getAttribute('colspan')
                        var span=parseInt(document.getElementsByTagName("tr")[j].cells[kraj].getAttribute('colspan'),10)+1;
                        if(check == null)
                        {
                            td = document.createElement("td");
                            td.colSpan=1;
                            tblBody.rows[j].appendChild(td);

                        }
                        else document.getElementsByTagName("tr")[j].cells[kraj].setAttribute('colspan',span.toString());
                        
                    }
                    break;
                }
              
            }



        },

        editujCommit:function(rbZadatka,rbCommita,url) {

            for(var i =0; i<tblBody.rows.length; i++)
            {
               
                if(i==rbZadatka)
                {
                    row = tblBody.getElementsByTagName("tr")[i];
                    for(var j=1; j<row.cells.length;j++)
                    {
                        brojCommita=parseInt(row.cells[j].getElementsByTagName('a')[0].text,10)
                        if(rbCommita==brojCommita) row.cells[j].innerHTML= '<a href="'+ url+'">' + rbCommita.toString() +'</a>';
                    }
                }
            }

        },
        obrisiCommit:function(rbZadatka,rbCommita){
            for(var i =1; i<tblBody.rows.length; i++)
            {
               
                if(i==rbZadatka)
                {
                    row = tblBody.getElementsByTagName("tr")[i];
                    for(var j=1; j<row.cells.length;j++)
                    {
                        
                        brojCommita=parseInt(row.cells[j].getElementsByTagName('a')[0].text,10)
                        if(rbCommita==brojCommita) 
                        {
                            row.deleteCell(j);
                            kraj = row.cells.length-1;
                            if(row.cells[kraj].colSpan >= 1)
                            {
                                row.cells[kraj].colSpan+=1;
                            }
                            

                          
                        }
                       
                    }
                }
                if(i===tblBody.rows.length) return -1;
            }
            
        }

        
    }
        
}
    return konstruktor;

    }());
  