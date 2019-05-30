function validirajFPojedinacni()
{
    var mojDiv = document.getElementById('greskaPrvaForma');
    mojDiv.innerHTML="";
    mojDiv.innerHTML="";
    var validacija = new Validacija(mojDiv);
    var godine = document.getElementsByName('fPojedinacni')[0].elements[0];
    var ime = document.getElementsByName('fPojedinacni')[0].elements[1];
    var index = document.getElementsByName('fPojedinacni')[0].elements[2];    
    validacija.godina(godine);
    validacija.ime(ime);
    validacija.index(index);
    
}

function validirajFMasovni()
{
    var mojDiv = document.getElementById('greskaDrugaForma');
    mojDiv.innerHTML="";
    mojDiv.innerHTML="";
    var validacija = new Validacija(mojDiv);
    var godine = document.getElementsByName('fMasovni')[0].elements[0];
    validacija.godina(godine);
}