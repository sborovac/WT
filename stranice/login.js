function validirajFormu()
{
    var mojDiv = document.getElementById('greska');
    mojDiv.innerHTML="";
    var validacija = new Validacija(mojDiv);
    var ime = document.getElementById('login').getElementsByTagName('form')[0].elements[0];
    var password = document.getElementById('login').getElementsByTagName('form')[0].elements[1];
    validacija.ime(ime);
    validacija.password(password);
}