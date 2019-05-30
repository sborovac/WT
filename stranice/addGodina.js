function validirajFormu()
{
    var mojDiv = document.getElementById('greska');
    mojDiv.innerHTML="";
    var validacija = new Validacija(mojDiv);
    var nazivGodine = document.getElementsByTagName('form')[0].elements[0];
    var nazivVjezbe = document.getElementsByTagName('form')[0].elements[1];
    var nazivSpirale = document.getElementsByTagName('form')[0].elements[2];
    validacija.godina(nazivGodine);
    validacija.naziv(nazivVjezbe);
    validacija.naziv(nazivSpirale);
}