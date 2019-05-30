function validirajFormu()
{
    var mojDiv = document.getElementById('greska');
    mojDiv.innerHTML="";
    var validacija = new Validacija(mojDiv);
    validacija.naziv(document.getElementById('noviZadatak').elements[0]);
}