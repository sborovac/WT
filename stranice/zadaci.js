function validirajFormu()
{   
    var mojDiv = document.getElementById('greska');
    mojDiv.innerHTML="";
    var validacija = new Validacija(mojDiv);
    validacija.ime(document.getElementsByClassName('cetvrtina')[1].getElementsByTagName('form')[0].elements[0]);
}