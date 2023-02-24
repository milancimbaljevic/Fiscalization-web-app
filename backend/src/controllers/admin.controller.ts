import express from 'express'
import AdminModel from '../models/admin.model'
import PreduzeceModel from '../models/preduzece.model'
import RacunModel from '../models/racun.model'
import KupacModel from '../models/kupac.model'

export class AdminController {
    prijava = (req: express.Request, res: express.Response) => {
        AdminModel.findOne({ korisnicko_ime: req.body.korisnicko_ime }, (err, kor1) => {
            if (err) console.log(err)
            else {
                if (kor1) {
                    AdminModel.findOne({ korisnicko_ime: req.body.korisnicko_ime, lozinka: req.body.lozinka }, (err1, kor2) => {
                        if (kor2) {
                            kor2.stat = "ok"
                            res.json(kor2)
                        } else {
                            res.json({ stat: 'not', message: 'Pogresna lozinka' })
                        }
                    })
                } else res.json({ stat: "not", message: "Korisnik sa datim korisnickim imenom ne postoji" })
            }
        })
    }

    dodajAdmina = (req: express.Request, res: express.Response) => {
        const ad = new AdminModel({
            ime: req.body.ime,
            prezime: req.body.prezime,
            korisnicko_ime: req.body.korisnicko_ime,
            lozinka: req.body.lozinka,
            tip_korisnika: "admin"
        })

        ad.save((err, re) => {
            if (err) console.log(err)
            else res.json({ stat: 'ok', message: "Uspjesno ste dodali admin" })
        })
    }

    dohvatiZahtjeve = (req: express.Request, res: express.Response) => {
        PreduzeceModel.find({ status: req.body.status }, (err, zaht) => {
            if (err) console.log(err)
            else res.json(zaht)
        })
    }

    odbiIliPrihvatiPreduzece = (req: express.Request, res: express.Response) => {
        PreduzeceModel.updateOne({ korisnicko_ime: req.body.korisnicko_ime }, { status: req.body.status }, (err, re) => {
            if (err) console.log(err)
            else res.json({ stat: "ok", message: "Uspjesna akcija" })
        })
    }


    // dohvatiIzvjestaj = (req: express.Request, res: express.Response) => {
    //     const datum_od = new Date(req.body.datum_od.split('-')[0], req.body.datum_od.split('-')[1]-1, req.body.datum_od.split('-')[2])
    //     const datum_do = new Date(req.body.datum_do.split('-')[0], req.body.datum_do.split('-')[1]-1, req.body.datum_do.split('-')[2])

    //     if (req.body.PIB != -1) {
    //         PreduzeceModel.findOne({ PIB: req.body.PIB }, (err, e1) => {
    //             if (err) console.log(err)
    //             else {
    //                 RacunModel.find({ korisnicko_ime_preduzeca: e1.korisnicko_ime }, (err, e2) => {
    //                     if (err) console.log(err)
    //                     else {
    //                         for(let racun of e2){
    //                             const d = new Date(racun.datum.split('-')[0], racun.datum.split('-')[1]-1, racun.datum.split('-')[2])
    //                         }
    //                     }
    //                 })
    //             }
    //         })
    //     } else if (req.body.naziv != "null") {

    //     } else {

    //     }
    // }

    dohvatiIzvjestaj = (req: express.Request, res: express.Response) => {
        PreduzeceModel.find({}, (err, pred) => {
            if (err) console.log(err)
            else {
                let izvjestaji = []
                for (let i = 0; i < pred.length; i++) {

                    const d = {
                        ukupan_iznos: 0,
                        porez: 0
                    }

                    RacunModel.find({ datum: req.body.datum, korisnicko_ime_preduzeca: pred[i].korisnicko_ime }, (err, racuni) => {
                        if (err) console.log(err)
                        else {
                            for (let r of racuni) {
                                d.ukupan_iznos += r.iznos + r.ukupan_porez
                                d.porez += r.ukupan_porez
                            }

                            izvjestaji.push({
                                naziv: pred[i].naziv,
                                email: pred[i].email,
                                korisnicko_ime: pred[i].korisnicko_ime,
                                iznos: d.ukupan_iznos,
                                telefon: pred[i].telefon
                            })

                            if(i + 1 == pred.length) res.json(izvjestaji)
                        }
                    })
                }
            }
        })
    }

    dodajKupca = (req: express.Request, res: express.Response) => {
        KupacModel.findOne({korisnicko_ime: req.body.korisnciko_ime}, (err, kup) => {
            if(err) console.log(err)
            else{
                if(kup){
                    res.json({stat: "not", message: "Korisnicko ime zauzeto"})
                }else{
                    const kupac = new KupacModel({
                        ime: req.body.ime,
                        prezime: req.body.prezime,
                        korisnicko_ime: req.body.korisnciko_ime,
                        lozinka: req.body.lozinka,
                        telefon: req.body.telefon,
                        broj_licne_karte: req.body.broj_licne_karte,
                        tip_korisnika: "kupac"
                    })
            
                    kupac.save((err,e)=>{
                        if(err) console.log(err)
                        else res.json({stat: "ok", message: "Uspjesno ste dodali kupca"})  
                    })
                }
            }
        })
    }
}