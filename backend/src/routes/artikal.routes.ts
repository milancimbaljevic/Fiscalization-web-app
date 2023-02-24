import express from 'express';
import { ArtikalController } from '../controllers/artikal.controller'
const multer = require("multer");

var storage = multer.diskStorage(
    {
        destination: './slike_artikli/',
        filename: function (req, file, cb) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            let filename = file.originalname + '-' + Date.now() + ".png"
            req.body.slika = filename
            cb(null, filename);
        }
    }
);


var slike_artikli = multer({ storage: storage });
const artikalRouter = express.Router();

artikalRouter.route('/dodajNoviArtikal').post(slike_artikli.single("slika"), (req, res, next) => {
    if (req.body.ima_sliku == "false") {
        req.body.slika = "default.jpg"
    }
    next()
}, (req, res) => {
    new ArtikalController().dodajNoviArtikal(req, res)
})


artikalRouter.route('/dohvatiSveArtikle').post((req,res)=>{
    new ArtikalController().dohvatiSveArtikle(req,res)
})

artikalRouter.route('/dodajArtikalUKategoriju').post((req,res)=>{
    new ArtikalController().dodajArtikalUKategoriju(req,res)
})

artikalRouter.route('/dodajKatergoriju').post((req,res)=>{
    new ArtikalController().dodajKatergoriju(req,res)
})

artikalRouter.route('/dohvatiArtikleIzKategorije').post((req,res)=>{
    new ArtikalController().dohvatiArtikleIzKategorije(req,res)
})

artikalRouter.route('/dohvatiSveArtiklePretraga').post((req,res)=>{
    new ArtikalController().dohvatiSveArtiklePretraga(req,res)
})

artikalRouter.route('/').post((req,res)=>{
    new ArtikalController().dohvatiSveArtikle(req,res)
})

export default artikalRouter