var tabela={}
function KreirajTabelu() {
    var mojDivTabela = document.getElementById("myDiv");
    var brZadataka = document.getElementsByTagName('form')[0].elements[0];
    var tabel = new CommitTabela(mojDivTabela, parseInt(brZadataka.value,10));
    tabela=tabel;
}
function AddCommit()
{
    var mojDivValidacija = document.getElementById('greska');
    mojDivValidacija.innerHTML="";
    var validacija = new Validacija(mojDivValidacija);
    var brZadataka = document.getElementsByTagName('form')[1].elements[0];
    var url =  document.getElementsByTagName('form')[1].elements[1];
    validacija.url(url);
    tabela.dodajCommit(parseInt(brZadataka.value,10),url.value);  

}

function EditCommit()
{
    var mojDivValidacija = document.getElementById('greska');
    mojDivValidacija.innerHTML="";
    var validacija = new Validacija(mojDivValidacija);
    var brZadataka = document.getElementsByTagName('form')[1].elements[3];
    var brCommita = document.getElementsByTagName('form')[1].elements[4];
    var url =  document.getElementsByTagName('form')[1].elements[5];
    validacija.url(url);  
    tabela.editujCommit(parseInt(brZadataka.value,10),parseInt(brCommita.value,10), url.value);
       


}

function DeleteCommit()
{
    var mojDivValidacija = document.getElementById('greska');
    mojDivValidacija.innerHTML="";
    var validacija = new Validacija(mojDivValidacija);
    var brZadataka = document.getElementsByTagName('form')[1].elements[7];
    var brCommita = document.getElementsByTagName('form')[1].elements[8];
    if(tabela.obrisiCommit(parseInt(brZadataka.value,10),parseInt(brCommita.value,10))==-1)
    {
        var p=document.createElement("p");
        p.innerHTML="Pogrešni parametrni";
        mojDivValidacija.appendChild(p);
    }
}



