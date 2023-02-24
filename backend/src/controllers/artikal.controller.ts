import express from 'express'
import ArtikalModel from '../models/artikal.model'
import PreduzeceModel from '../models/preduzece.model'

export class ArtikalController {

    dodajNoviArtikal = (req: express.Request, res: express.Response) => {


        console.log("aloo 2")
        console.log(req.body)

        console.log(JSON.parse(req.body.stanja))

        const art = new ArtikalModel({
            sifra: req.body.sifra,
            naziv: req.body.naziv,
            jedinica_mere: req.body.jedinica_mere,
            stopa_poreza: req.body.stopa_poreza,
            proizvodjac: req.body.proizvodjac,
            tip: req.body.tip,
            slika: req.body.slika,
            stanja: JSON.parse(req.body.stanja),
            korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca,
            u_kategoriji: false,
            kategorija: ""
        })

        ArtikalModel.findOne({ sifra: req.body.sifra, korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca }, (err, a) => {
            if (err) console.log(err)
            else {
                if (a) {
                    res.json({ stat: "not", message: "Proizvod sa zadatom sifrom vec postoji na nivou preduzeca" })
                } else {
                    art.save((err, r) => {
                        if (err) console.log(err)
                        else {
                            res.json({ stat: "ok", message: "Uspjesno ste dodali artikal" })
                        }
                    })
                }
            }
        })

    }

    dohvatiSveArtikle = (req: express.Request, res: express.Response) => {
        ArtikalModel.find({ korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca }, (err, artikli) => {
            if (err) console.log(err)
            else {
                res.json(artikli)
            }
        })
    }


    dodajKatergoriju = (req: express.Request, res: express.Response) => {
        PreduzeceModel.findOne({ korisnicko_ime: req.body.korisnicko_ime }, (err, pred) => {
            if (err) console.log(err)
            else {
                for (let kat of pred.kategorije) {
                    if (kat == req.body.kategorija) {
                        res.json({ stat: "not", message: "Kategroija vec postoji u preduzecu" })
                        return
                    }
                }
                PreduzeceModel.updateOne({ korisnicko_ime: req.body.korisnicko_ime }, { $push: { kategorije: req.body.kategorija } },
                    (err, r) => {
                        if (err) console.log(err)
                        else {
                            res.json({ stat: "ok", message: "Uspjesno ste dodali kategoriju" })
                        }
                    })
            }
        })
    }

    dodajArtikalUKategoriju = (req: express.Request, res: express.Response) => {
        ArtikalModel.findOne({ sifra: req.body.sifra, korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca }, (err, art) => {
            if (err) console.log(err)
            else {
                if (art.u_kategoriji) {
                    res.json({ stat: "not", message: "Artikal se vec nalazi u kategoriji" })
                } else {

                    ArtikalModel.updateOne({ sifra: req.body.sifra, korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca }, {u_kategoriji: true, kategorija: req.body.kategorija}, (err, r) => {
                        if (err) console.log(err)
                        else res.json({ stat: "ok", message: "Uspjesno ste dodali artikal u kategoriju" })
                    })

                }
            }
        })
    }

    dohvatiArtikleIzKategorije = (req: express.Request, res: express.Response) => {
        ArtikalModel.find({korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca, kategorija: req.body.kategorija}, (err, artikli)=>{
            if(err) console.log(err)
            else res.json(artikli)
        })
    }

    dohvatiSveArtiklePretraga = (req: express.Request, res: express.Response) => {
        ArtikalModel.find({korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca, naziv: {$regex : req.body.pretraga}}, (err, art)=>{
            if(err) console.log(err)
            else res.json(art)
        })
    }
}