import express from 'express';
import { PreduzeceController } from '../controllers/preduzece.controller';
const multer = require("multer");
var storage = multer.diskStorage(
    {
        destination: './slike/',
        filename: function (req, file, cb) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            let filename = file.originalname + '-' + Date.now() + ".png"
            req.body.logo = filename
            cb(null, filename);
        }
    }
);

var slike = multer({ storage: storage });
const preduzeceRouter = express.Router();

preduzeceRouter.route('/registracija').post(slike.single("logo"),
    (req, res) => new PreduzeceController().registracija(req, res)
)

preduzeceRouter.route('/prijava').post((req, res) => {
    new PreduzeceController().prijava(req, res)
})

preduzeceRouter.route('/unesiDodatneInformacije').post((req,res)=>{
    new PreduzeceController().dodajDodatneInformacije(req,res)
})

preduzeceRouter.route('/dohvatiPreduzece').post((req,res)=>{
    new PreduzeceController().dohvatiPreduzece(req,res)
})

preduzeceRouter.route('/promijeniLozinku').post((req,res)=>{
    new PreduzeceController().promijeniLozinku(req,res)
})


preduzeceRouter.route('/dohvatiPIB').post((req,res)=>{
    new PreduzeceController().traziPIB(req,res)
})

preduzeceRouter.route('/dodajNarucioca').post((req,res)=>{
    new PreduzeceController().dodajNarucioca(req,res)
})


preduzeceRouter.route('/dodajNaruciocaRucno').post(slike.single("logo"),(req,res)=>{
    new PreduzeceController().dodajNaruciocaRucno(req,res)
})

preduzeceRouter.route('/dohvatiSvaOdeljenja').post((req,res)=>{
    new PreduzeceController().dohvatiSvaOdeljenja(req,res)
})

preduzeceRouter.route('/dodajOdaljenje').post((req,res)=>{
    new PreduzeceController().dodajOdaljenje(req,res)
})

preduzeceRouter.route('/dodajStoUOdaljenje').post((req,res)=>{
    new PreduzeceController().dodajStoUOdaljenje(req,res)
})

preduzeceRouter.route('/oznaciStoKaoZauzet').post((req,res)=>{
    new PreduzeceController().oznaciStoKaoZauzet(req,res)
})

preduzeceRouter.route('/oznaciStoKaoSlobodan').post((req,res)=>{
    new PreduzeceController().oznaciStoKaoSlobodan(req,res)
})

preduzeceRouter.route('/sacuvajNovuLokacijuStola').post((req,res)=>{
    new PreduzeceController().sacuvajNovuLokacijuStola(req,res)
})

preduzeceRouter.route('/sacuvajRacun').post((req,res)=>{
    new PreduzeceController().sacuvajRacun(req,res)
})

preduzeceRouter.route('/dohvatiPetRacuna').get((req,res)=>{
    new PreduzeceController().dohvatiPetRacuna(req,res)
})

preduzeceRouter.route('/dohvatiUkupanIznosRacunaZaDatum').post((req,res)=>{
    new PreduzeceController().dohvatiUkupanIznosRacunaZaDatum(req,res)
})

preduzeceRouter.route('/dohvatiSvaPreduzeca').get((req,res)=>{
    new PreduzeceController().dohvatiSvaPreduzeca(req,res)
})

preduzeceRouter.route('/dohvatiRacunePreduzecaZaDatum').post((req,res)=>{
    new PreduzeceController().dohvatiRacunePreduzecaZaDatum(req,res)
})

preduzeceRouter.route('/promijeniStatusPreduzeca').post((req,res)=>{
    new PreduzeceController().promijeniStatusPreduzeca(req,res)
})

export default preduzeceRouter;