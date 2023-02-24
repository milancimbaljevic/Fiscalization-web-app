import express from 'express';
import { KupacController } from '../controllers/kupac.controller';

const kupacRouter = express.Router()

kupacRouter.route('/dodajKupca').post((req,res)=>{
    new KupacController().dodajKupca(req,res)
})

kupacRouter.route('/dohvatiKupca').post((req,res)=>{
    new KupacController().dohvatiKupca(req,res)
})

kupacRouter.route('/dohvatiArtikle').post((req,res)=>{
    new KupacController().dohvatiArtikle(req,res)
})

kupacRouter.route('/dohvatiMojeRacune').post((req,res)=>{
    new KupacController().dohvatiMojeRacune(req,res)
})

kupacRouter.route('/dodajKupca').post((req,res)=>{
    new KupacController().dodajKupca(req,res)
})

export default kupacRouter