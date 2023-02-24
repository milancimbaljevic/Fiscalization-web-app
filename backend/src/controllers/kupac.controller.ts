import express from 'express'
import KupacModel from '../models/kupac.model'
import ArtikalModel from '../models/artikal.model'
import RacunModel from '../models/racun.model'

export class KupacController {

    dodajKupca = (req: express.Request, res: express.Response) => {
        KupacModel.findOne({ korisnicko_ime: req.body.korisnicko_ime }, (err, kup) => {
            if (err) console.log(err)
            else {
                if (kup) res.json({ stat: "not", message: "Korisnicko ime zauzeto" })
                else {
                    const kupac = new KupacModel({
                        ime: req.body.ime,
                        prezime: req.body.prezime,
                        korisnicko_ime: req.body.korisnicko_ime,
                        lozinka: req.body.lozinka,
                        telefon: req.body.telefon,
                        broj_licne_karte: req.body.broj_licne_karte,
                    })

                    kupac.save((err, re) => {
                        if (err) console.log(err)
                        else res.json({ stat: "ok", message: "Uspjesno ste sacuvali kupca" })
                    })
                }
            }
        })
    }

    dohvatiKupca = (req: express.Request, res: express.Response) => {
        KupacModel.findOne({ korisnicko_ime: req.body.korisnicko_ime }, (err, kup) => {
            if (err) console.log(err)
            else res.json(kup)
        })
    }


    dohvatiArtikle = (req: express.Request, res: express.Response) => {
        const a = []

        ArtikalModel.find({ naziv: { $regex: req.body.pretraga }, korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca }, (err1, art1) => {
            if (err1) console.log(err1)
            else {
                for (let ar of art1) a.push(ar)
                ArtikalModel.find({ proizvodjac: { $regex: req.body.pretraga }, korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca }, (err2, art2) => {
                    if (err2) console.log(err2)
                    else {
                        for (let ar of art2) a.push(ar)
                        res.json(a)
                    }
                })

            }
        })
    }

    dohvatiMojeRacune = (req: express.Request, res: express.Response) => {
        RacunModel.find({"podaci_o_kupcu.broj_licne_karte_kupca" : req.body.broj_licne_karte_kupca+""}, (err, racuni) => {
            if(err) console.log(err)
            else {
                console.log("racuni", racuni)
                res.json(racuni)
            }
        })
    }
}