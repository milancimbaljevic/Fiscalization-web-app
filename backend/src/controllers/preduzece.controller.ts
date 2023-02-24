import express from 'express'
import PreduzeceModel from '../models/preduzece.model'
import OdeljenjeModel from '../models/odeljenje.model'
import RacunModel from '../models/racun.model'
import KupacModel from '../models/kupac.model'
import ArtikalModel from '../models/artikal.model'
import AdminModel from '../models/admin.model'

export class PreduzeceController {
    registracija = (req: express.Request, res: express.Response) => {

        console.log(req.body)

        PreduzeceModel.findOne({ korisnicko_ime: req.body.korisnicko_ime }, (err, pred) => {
            if (err) console.log(err)
            else {
                if (pred) {
                    res.json({ status: "not", message: "Korisnicko ime je vec zauzeto" })
                } else {
                    PreduzeceModel.findOne({ email: req.body.email }, (err1, pred1) => {
                        if (err1) console.log(err1)
                        if (pred1) {
                            res.json({ status: "not", message: "Email je vec registrovan" })
                        } else {
                            req.body.status = "neaktivan"
                            req.body.prvi_login = true
                            req.body.kategorije = []
                            let pr = new PreduzeceModel(req.body)
                            pr.save((err, res1) => {
                                if (err) console.log(err)
                                else res.json({ status: "ok" })
                            })
                        }
                    })
                }
            }
        })
    }

    prijava = (req: express.Request, res: express.Response) => {
        PreduzeceModel.findOne({ korisnicko_ime: req.body.korisnicko_ime }, (err, kor1) => {
            if (err) console.log(err)
            else {
                if (kor1) {
                    PreduzeceModel.findOne({ korisnicko_ime: req.body.korisnicko_ime, lozinka: req.body.lozinka }, (err1, kor2) => {
                        if (kor2) {
                            if (kor2.status == 'neaktivan') {
                                res.json({ stat: 'not', message: "Zahtjev nije prihvacen" })
                            } else {
                                kor2.stat = "ok"
                                res.json(kor2)
                            }
                        } else {
                            res.json({ stat: 'not', message: 'Pogresna lozinka' })
                        }
                    })
                } else {

                    KupacModel.findOne({ korisnicko_ime: req.body.korisnicko_ime }, (err, kor1) => {
                        if (err) console.log(err)
                        else {
                            if (kor1) {
                                KupacModel.findOne({ korisnicko_ime: req.body.korisnicko_ime, lozinka: req.body.lozinka }, (err1, kor2) => {
                                    if (kor2) {
                                        kor2.stat = "ok"
                                        res.json(kor2)
                                    } else {
                                        res.json({ stat: 'not', message: 'Pogresna lozinka' })
                                    }
                                })
                            } else {
                                res.json({ stat: "not", message: "Korisnik sa datim korisnickim imenom ne postoji" })
                            }
                        }
                    })



                }
            }
        })
    }

    dodajDodatneInformacije = (req: express.Request, res: express.Response) => {
        PreduzeceModel.updateOne({ korisnicko_ime: req.body.korisnicko_ime }, {
            prvi_login: false,
            kategorija: req.body.kategorija,
            sifra_delatnosti: req.body.sifra_delatnosti,
            u_pdv_sistemu: req.body.u_pdv_sistemu,
            ziro_racuni: req.body.ziro_racuni,
            broj_fiskalnih_kasa: req.body.broj_fiskalnih_kasa,
            broj_magacina: req.body.broj_magacina,
            magacini_objekti: req.body.magacini_objekti,
            kase: req.body.kase
        }, (err) => {
            if (err) console.log(err)
            else {
                res.json({ stat: "ok" })
            }
        })
    }

    dohvatiPreduzece = (req: express.Request, res: express.Response) => {
        PreduzeceModel.findOne({ korisnicko_ime: req.body.korisnicko_ime, loznika: req.body.lozinka }, (err, pred) => {
            if (err) console.log(err)
            else {
                res.json(pred)
            }
        })
    }

    promijeniLozinku = (req: express.Request, res: express.Response) => {
        if (req.body.tip_korisnika == "preduzece") {
            PreduzeceModel.updateOne({ korisnicko_ime: req.body.korisnicko_ime, lozinka: req.body.stara_lozinka }, {
                lozinka: req.body.lozinka
            }, (err) => {
                if (err) console.log(err)
                else {
                    res.json({ "stat": "ok" })
                }
            })
        } else if (req.body.tip_korisnika == "kupac") {
            KupacModel.updateOne({ korisnicko_ime: req.body.korisnicko_ime, lozinka: req.body.stara_lozinka }, {
                lozinka: req.body.lozinka
            }, (err) => {
                if (err) console.log(err)
                else {
                    res.json({ "stat": "ok" })
                }
            })
        } else if (req.body.tip_korisnika == "admin") {
            AdminModel.updateOne({ korisnicko_ime: req.body.korisnicko_ime, lozinka: req.body.stara_lozinka }, {
                lozinka: req.body.lozinka
            }, (err) => {
                if (err) console.log(err)
                else {
                    res.json({ "stat": "ok" })
                }
            })
        }
    }

    traziPIB = (req: express.Request, res: express.Response) => {
        PreduzeceModel.findOne({ PIB: req.body.PIB }, (err, pred) => {
            if (err) console.log(err)
            else {
                res.json(pred)
            }
        })
    }

    dodajNarucioca = (req: express.Request, res: express.Response) => {
        PreduzeceModel.findOne({ korisnicko_ime: req.body.korisnicko_ime, lozinka: req.body.lozinka }, (err, pred) => {
            for (let narucioc of pred.narucioci) {
                if (narucioc.PIB == req.body.narucioc.PIB) {
                    res.json({ stat: "not", message: "Preduzece sa datim PIB-om se vec nalazi u vasim naruciocima" })
                    return
                }
            }

            PreduzeceModel.updateOne({ korisnicko_ime: req.body.korisnicko_ime, lozinka: req.body.lozinka },
                { $push: { 'narucioci': req.body.narucioc } }
                , (err, cb) => {
                    if (err) console.log(err)
                    else {
                        res.json({ stat: "ok" })
                    }
                })

        })
    }

    dodajNaruciocaRucno = (req: express.Request, res: express.Response) => {

        PreduzeceModel.findOne({ korisnicko_ime: req.body.korisnicko_ime, lozinka: req.body.lozinka }, (err, pred) => {
            for (let narucioc of pred.narucioci) {
                if (narucioc.PIB == req.body.PIB) {
                    res.json({ stat: "not", message: "Preduzece sa datim PIB-om se vec nalazi u vasim naruciocima" })
                    return
                }
            }

            const n = {
                naziv: req.body.naziv,
                broj_dana_za_placanje: req.body.broj_dana_za_placanje,
                procenat_rabata: req.body.procenat_rabata,
                ime: req.body.ime,
                prezime: req.body.prezime,
                telefon: req.body.telefon,
                email: req.body.email,
                naziv_preduzeca_porucioca: req.body.naziv_preduzeca_porucioca,
                drzava: req.body.drzava,
                grad: req.body.grad,
                postanski_broj: req.body.postanski_broj,
                ulica_i_broj: req.body.ulica_i_broj,
                maticni_broj: req.body.maticni_broj,
                logo: req.body.logo,
                PIB: req.body.PIB
            }

            PreduzeceModel.updateOne({ korisnicko_ime: req.body.korisnicko_ime, lozinka: req.body.lozinka },
                { $push: { 'narucioci': n } }
                , (err, cb) => {
                    if (err) console.log(err)
                    else {
                        res.json({ stat: "ok" })
                    }
                })

        })

    }

    dohvatiSvaOdeljenja = (req: express.Request, res: express.Response) => {
        OdeljenjeModel.find({ korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca }, (err, odeljenja) => {
            if (err) console.log(err)
            else res.json(odeljenja)
        })
    }

    dodajOdaljenje = (req: express.Request, res: express.Response) => {
        let od = new OdeljenjeModel({
            naziv_odeljenja: req.body.naziv_odeljenja,
            korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca,
            naziv_preduzeca: req.body.naziv_preduzeca,
            raspored_stolova: req.body.raspored_stolova,
            oblik: req.body.oblik
        })

        od.save((err, r) => {
            if (err) console.log(err)
            else res.json({ stat: "ok", message: "Uspjesno ste dodali kategoriju" })
        })
    }

    dodajStoUOdaljenje = (req: express.Request, res: express.Response) => {
        OdeljenjeModel.updateOne({
            naziv_odeljenja: req.body.naziv_odeljenja,
            korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca,
        }, { $push: { raspored_stolova: req.body.sto } }, (err, r) => {
            if (err) console.log(err)
            else res.json({ stat: "ok", message: "Uspjesno ste dodali sto u kategoriju" })
        }
        )
    }

    oznaciStoKaoZauzet = (req: express.Request, res: express.Response) => {
        OdeljenjeModel.findOneAndUpdate({
            naziv_odeljenja: req.body.naziv_odeljenja,
            korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca,
            "raspored_stolova.id_stola": req.body.id_stola
        }, { "raspored_stolova.$.zauzet": true }, (err, od) => {
            if (err) console.log(err)
            else res.json({ stat: "ok", message: "Uspjesno ste zauzeli sto" })
        })
    }

    oznaciStoKaoSlobodan = (req: express.Request, res: express.Response) => {
        OdeljenjeModel.findOneAndUpdate({
            naziv_odeljenja: req.body.naziv_odeljenja,
            korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca,
            "raspored_stolova.id_stola": req.body.id_stola
        }, { "raspored_stolova.$.zauzet": false }, (err, od) => {
            if (err) console.log(err)
            else res.json({ stat: "ok", message: "Uspjesno ste zauzeli sto" })
        })
    }

    sacuvajNovuLokacijuStola = (req: express.Request, res: express.Response) => {
        OdeljenjeModel.findOneAndUpdate({
            korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca,
            naziv_odeljenja: req.body.naziv_odeljenja,
            "raspored_stolova.id_stola": req.body.id_stola
        }, { "raspored_stolova.$.x": req.body.x, "raspored_stolova.$.y": req.body.y }, (err, r) => {
            if (err) console.log(err)
            else res.json({ stat: "ok", message: "Uspjesno ste promijenili lokaciju stola" })
        })
    }


    sacuvajRacun = (req: express.Request, res: express.Response) => {
        const racun = new RacunModel({
            stavke: req.body.stavke,
            nacin_placanja: req.body.nacin_placanja,
            iznos: req.body.iznos,
            naziv_preduzeca: req.body.naziv_preduzeca,
            datum: req.body.datum,
            korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca,
            narucioc: req.body.narucioc,
            podaci_o_kupcu: req.body.podaci_o_kupcu,
            ukupan_porez: req.body.ukupan_porez,
            time: req.body.time,
            naziv_objekta: req.body.naziv_objekta
        })

        console.log(req.body)

        racun.save((err, succ) => {
            if (err) console.log(err)
            else {
                // radi update lagera

                for (let i = 0; i < racun.stavke.length; i++) {
                    ArtikalModel.findOneAndUpdate({
                        korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca,
                        naziv: racun.stavke[i].naziv_artikla, "stanja.naziv_magacina_objekta": racun.stavke[i].magacin_ili_objekat
                    },
                        {
                            $inc: { "stanja.$.tekuce_stanje_lagera": - (+racun.stavke[i].kolicina) }
                        }, (err, e) => {
                            if (err) console.log(err)
                            else if(i+1 == racun.stavke.length) res.json({ stat: "ok", message: "Uspjesno ste zatvorili racun" })
                        }
                    )
                }

            }
        })

    }


    dohvatiPetRacuna = (req: express.Request, res: express.Response) => {
        RacunModel.find({}, (err, racuni) => {
            if (err) console.log(err)
            else {
                racuni.sort((a, b) => {
                    return +b.time - +a.time
                })
                res.json(racuni.splice(0, 5))
            }
        })
    }


    dohvatiUkupanIznosRacunaZaDatum = (req: express.Request, res: express.Response) => {
        const d = {
            ukupan_iznos: 0,
            porez: 0
        }

        RacunModel.find({ datum: req.body.datum, korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca }, (err, racuni) => {
            if (err) console.log(err)
            else {
                console.log(req.body.datum)
                console.log(racuni)
                for (let r of racuni) {
                    d.ukupan_iznos += r.iznos + r.ukupan_porez
                    d.porez += r.ukupan_porez
                }
                res.json(d)
            }
        })
    }

    dohvatiSvaPreduzeca = (req: express.Request, res: express.Response) => {
        PreduzeceModel.find({}, (err, pred) => {
            if (err) console.log(err)
            else res.json(pred)
        })
    }

    dohvatiRacunePreduzecaZaDatum = (req: express.Request, res: express.Response) => {
        RacunModel.find({ datum: req.body.datum, korisnicko_ime_preduzeca: req.body.korisnicko_ime_preduzeca }, (err, racuni) => {
            if(err) console.log(err)
            else res.json(racuni)
        })
    }

    promijeniStatusPreduzeca = (req: express.Request, res: express.Response) => {
        PreduzeceModel.updateOne({korisnicko_ime: req.body.korisnicko}, {status: req.body.status}, (err,e)=>{
            if(err) console.log(err)
            else res.json({stat: "ok", message: "Uspjesno ste promijenili status korisnika"})
        })
    }
}



