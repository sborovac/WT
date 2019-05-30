const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
var path = require('path');
var multer = require('multer');
var json2xml = require('json2xml');
const db = require('./db.js');
const sequelize = require("sequelize");
db.sequelize.sync().then(function(){

}).catch(function(err){
    if(err) console.log(err);
})


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'zadaci'))
    },
    filename: function (req, file, cb) {
      fs.stat(path.join(__dirname,'zadaci',req.body['naziv']+'.pdf'),function(err) {  //  fs.stat('zadaci\\'+req.body['naziv']+'.pdf',function(err){
            if(!err)  console.log("greska"); //kako html upload
            else if(file.mimetype!="application/pdf") console.log("greska brt") ;//next(err)//console.log("greska braca")
            else cb(null, req.body['naziv'] + '.pdf');
        });
        
    },    
  })
  
  var upload = multer({ storage: storage,
    fileFilter: function (req, file, cb) {
            db.zadatak.count().then(function(brojZadataka){
                db.zadatak.findOne({where:{naziv:req.body['naziv']}}).then(function(zadatak){
                    if(file.mimetype!="application/pdf") return cb(new Error('Only pdf files allowed!'))
                    else if(zadatak==null) 
                    {
                        db.zadatak.create({id:brojZadataka+1,naziv:req.body['naziv'],postavka:"/"+req.body['naziv']+'.pdf'}).then(function(newRow){
                            cb(null, true);
                        })
                    }
                    else cb(new Error('Greska'));
                })           
             })
        }        
    }).single('postavka');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('zadaci'));
app.use(express.static('stranice'));



//prvi zadatak
app.get('/:nazivDokumenta(\\w+).html', function(req,res){
    res.sendFile(path.join(__dirname,'stranice',req.params.nazivDokumenta+'.html'));
});


//drugi zadatak
app.post('/addZadatak',function(req,res,){
    upload(req,res,function(err){
        if(err) res.sendFile(path.join(__dirname,'stranice','greska.html'));
        else {
            let zadatak={
            naziv: req.body['naziv'],
            postavka: "/"+req.body['naziv']+'.pdf'
        }   
        fs.writeFile(path.join(__dirname,'zadaci',req.body['naziv']+"Zad.json"),JSON.stringify(zadatak),function(err){
            if(err) console.log(err);
            fs.appendFile(path.join(__dirname,'spisakZadataka.txt'),req.body['naziv']+", /"+req.body['naziv']+'.pdf'+'\n',function(err) {
                if(err) console.log(err);
            });
            
          
        });
      res.end(JSON.stringify(zadatak));
    }
    });  
});

//treci zadatak
app.get('/zadatak',function(req,res){
    var trazeniZadatak = req.query.naziv;
    db.zadatak.findOne({
        where:{ naziv: trazeniZadatak}}).then(function(zadatak){
        if(zadatak==null) res.sendFile(path.join(__dirname,'stranice','greska.html'));
        else   res.sendFile(path.join(__dirname,'zadaci',zadatak.postavka));
    }).catch(function(err){
        res.send(err);
    }) 
});

//cetvrti zadatak
app.post('/addGodina', function(req,res){
        let tijelo = req.body;
        let novaLinija=tijelo['nazivGod']+", "+tijelo['nazivRepVje']+", "+tijelo["nazivRepSpi"]+"\n";
        db.godina.count().then(function(brojGodina){        
            db.godina.findOne({
                where:{ nazivGod: tijelo['nazivGod']}}).then(function(godina){
                if(godina==null)
                {
                    db.godina.create({id:brojGodina+1,nazivGod: tijelo['nazivGod'],nazivRepVje:tijelo['nazivRepVje'],nazivRepSpi:tijelo["nazivRepSpi"]});
                    fs.appendFile(path.join(__dirname,'godine.csv'),novaLinija,function(err){
                        if(err) console.log(err);
                        console.log('dodao sam nesto');
                    }) 
                    res.sendFile(path.join(__dirname,'stranice','addGodina.html'));
                }
                else {
                    res.sendFile(path.join(__dirname,'stranice','greska.html'));
                } 
            }).catch(function(err){
                res.send(err);
        }) 
    }); 
});


//peti zadatak
app.get('/godine' , function(req,res){
    db.godina.findAll().then(function(godine){
        var listaGodina = [];
        for(var i=0;i<godine.length;i++)
        {
            listaGodina[i]={
                nazivGod: godine[i].nazivGod,
                nazivRepVje: godine[i].nazivRepVje,
                nazivRepSpi: godine[i].nazivRepSpi
            }
        }
        res.write(JSON.stringify(listaGodina));
        res.end(); 
    })
});


//sedmi zadatak
app.get('/zadaci', function(req,res){

   var primljeniHederi=req.header('Accept');
   var heder=primljeniHederi.split(', ');
   var fajlovi=[];
    db.zadatak.findAll().then(function(zadaci){
       for(var i=0;i<zadaci.length;i++)
       {
        fajlovi[i]={
            "naziv": zadaci[i].naziv,
            "postavka": zadaci[i].postavka
      }
       }
  
    
    if(heder[0]=='application/json' || heder[1]=='application/json' || heder[2]=='application/json')
    {
        res.set('Content-Type','application/json');
        res.write(JSON.stringify(fajlovi));
        res.end();
    }
    else if(heder[0]=='application/xml' || heder[1]=='application/xml' || heder[2]=='application/xml')
    {
        
        /*let zadaci = {
            zadaci: fajlovi
        }
        
      //  res.write(json2xml(fajlovi)); 
        res.write(`<?xml version="1.0" encoding="UTF-8"?>`+json2xml(zadaci)); 
        res.end();*/
        res.set('Content-Type','application/xml');
        res.write(`<?xml version="1.0" encoding="UTF-8"?>`+'\n'+'<zadaci>');
        for(var i=0;i<fajlovi.length;i++)
        {
            res.write(`<zadatak> \n`+json2xml(fajlovi[i])+`\n`+`</zadatak>`)
        }
        res.write('\n </zadaci>');
        res.end();
       
        
    }
    else if(heder[0]=='text/csv' || heder[1]=='text/csv' || heder[2]=='text/csv')
    {
        
        res.set('Content-Type','text/csv');
        const Json2csvParser = require('json2csv').Parser;
         const fields = ["naziv", "postavka"];
       //res.write(json2csv.parse(fajlovi));
       console.log(fajlovi);
        const json2csvParser = new Json2csvParser({ fields });
       const csv = json2csvParser.parse(fajlovi);
       res.write(csv);
        res.end();
    }
    

})
});    


app.get('/:nazivZadatka(\\w+).pdf', function(req,res){
   res.sendFile(path.join(__dirname,'zadaci',req.params.nazivZadatka+'.pdf'));
});


//Spirala 4
//drugi zadatak
app.post("/addVjezba",function(req,res){

    let tijelo = req.body;
   
    if(tijelo['vjezbe']!=undefined)
    {
        db.vjezba.findOne({where:{naziv:tijelo['vjezbe']}}).then(function(vjezba){
           // console.log(vjezba);
            if(vjezba!=null) res.sendFile(path.join(__dirname,'stranice','greska.html'));
            else {
                db.vjezba.count().then(function(brojVjezbi){
                    if(tijelo['spirala']==undefined) db.vjezba.create({id:brojVjezbi+1,naziv:tijelo['vjezbe'],spirala:false});
                    db.vjezba.create({id:brojVjezbi+1,naziv:tijelo['vjezbe'],spirala:true})
                    db.godina.findOne({where: {nazivGod:tijelo['sGodine']}}).then(function(godina){
                    //   godina.setVjezba([brojVjezbi+1]);
                        db.vjezba.findById(brojVjezbi+1).then(function(vjezba){
                            vjezba.setGodine([godina.id]);
                        });                        
                    })
                })
                res.sendFile(path.join(__dirname,'stranice','addVjezba.html'));   
            }
        })    
        
            
    }
   else {
        console.log(tijelo);
        db.godina.findOne({where: {nazivGod:tijelo['sGodine']}}).then(function(godina){
        db.vjezba.findOne({where: {naziv:tijelo['sVjezbe']}}).then(function(vjezba){
            console.log(vjezba.id);
           // godina.setVjezba([vjezba.id]);
           //db.godinaVjezba.create([godina.id,vjezba.id]);
            vjezba.addGodine(godina);
            }).catch(function(err){
                console.log("greska");
                console.log(err);
            }) 
        })
        res.sendFile(path.join(__dirname,'stranice','addVjezba.html'));
    
    }
   
});
//citanje godina iz baze+-
app.get("/ucitajGodine",function(req,res){
    db.godina.findAll().then(function(godine){
        res.send(godine);
    })
})
//citanje vjezbi iz baze
app.get("/ucitajVjezbe",function(req,res){
    db.vjezba.findAll().then(function(vjezbe){
        res.send(vjezbe);
    })
})

//zadaci bez veze
app.get("/ucitajZadatke",function(req,res){
    var zadaciBezVeze = [];
    db.vjezba.findOne({where: {naziv: req.query.vjezba}}).then(function(idVjezbe){
        db.zadatak.findAll({include: ['vjezbe']}).then(function(zadaciPovezani){
          //  console.log(idVjezbe);
          //  console.log(zadaciPovezani[0].vjezbe[0]['id']);
           
                      for(var j=0;j<zadaciPovezani.length;j++)
                       {
                           if(JSON.stringify(zadaciPovezani[j].vjezbe)=='[]') zadaciBezVeze.push(zadaciPovezani[j]);
                           else if(JSON.stringify(zadaciPovezani[j].vjezbe[0]['id']) == idVjezbe) continue;
                          
                       
                       }
               
                   
                       
                       res.send(JSON.stringify(
                           { "zadaci": zadaciBezVeze,
                            "idVjezbe":idVjezbe.id}));
           })
    })
    
   
})


app.post("/vjezba/:idVjezbe/zadatak",function(req,res){
    let tijelo=req.body;
    console.log(req.params.idVjezbe);
    db.vjezba.findOne({where: {id: req.params.idVjezbe}}).then(function(vjezba){
        db.zadatak.findOne({where: {naziv:tijelo['sZadatak']}}).then(function(zadatak){
           vjezba.addZadaci(zadatak);
        //   console.log("sup");
        })
    })
    res.redirect("http://localhost:8080/addVjezba.html");
    
})


//treci zadatak
function ProvjeriStudenta(student,i) {
    var promise = new Promise(function(resolve,reject){
        db.student.findOne({where:{index:student.index}}).then(function(checkedStudent){
            if(checkedStudent==null) reject(i);
            else resolve(checkedStudent);
        })
    })
    return promise;
}
app.post("/student",function(req,res){
     //var podaci = req.body.studenti;
     var brojNovihStudenta=0;
    db.godina.findOne({where: {nazivGod:req.body.godina}}).then(function(godina){  
        var studenti = JSON.parse(req.body.studenti);
        
        db.student.count().then(function(brojStudenata){
            for(var i=0;i<studenti.length;i++)
            {
                var checkedStudent = ProvjeriStudenta(studenti[i],i);
                checkedStudent.then(function(student){
                   
                    godina.addStudenti(student);
                }).catch(function(j){
                      //  brojNovihStudenta+=1;                
                        db.student.create({id:brojStudenata+1,imePrezime:studenti[j].imePrezime,index:studenti[j].index}).then(function(newStudent){
                           
                            godina.addStudenti(newStudent);
                        })
                                             
                    })
                    brojStudenata+=1; 
                    console.log(brojNovihStudenta);
            }
            brojNovihStudenta= brojStudenata-studenti.length;
          //  if(brojNovihStudenta==0) brojNovihStudenta=studenti.length;
            res.set("Content-Type","application/json");
            res.status(200).send({"message":"Dodano je "+brojNovihStudenta +" i upisano je "+ brojStudenata + " na godinu "+ godina.nazivGod}); 
        })        
    })
})



app.listen(8080);
