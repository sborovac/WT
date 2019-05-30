function validirajPrvuFormu()
{
    var mojDiv = document.getElementById('greskaPrvaForma');
    var validacija = new Validacija(mojDiv);
    var godine = document.getElementsByName('fPostojeca')[0].elements[0];
    validacija.godina(godine);
}

function validirajDruguFormu()
{
    var mojDiv = document.getElementById('greskaDrugaForma');
    var validacija = new Validacija(mojDiv);
    var naziv = document.getElementsByName('fNova')[0].elements[0];
    var godina = document.getElementsByName('fNova')[0].elements[1];
    validacija.naziv(naziv);
    validacija.godina(godina);
}

function validirajZadatak()
{
    var mojDiv = document.getElementById('greskaDrugaForma');
    var validacija = new Validacija(mojDiv);
    var zadatak = document.getElementsByName('fNova')[0].elements[3];
    validacija.naziv(zadatak);

}