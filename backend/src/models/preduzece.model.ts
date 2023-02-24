import mongoose from 'mongoose'

const Schema = mongoose.Schema

let Preduzece = new Schema({
    ime: { type: String },
    prezime: { type: String },
    korisnicko_ime: { type: String },
    lozinka: { type: String },
    telefon: { type: String },
    email: { type: String },
    naziv: { type: String },
    drzava: { type: String },
    grad: { type: String },
    postanski_broj: { type: Number },
    ulica_i_broj: { type: String },
    PIB: { type: Number },
    maticni_broj: { type: Number },
    logo: { type: String },
    kategorija: { type: Number }, // 1 ako je ugostitelj nula u suprotnom
    sifra_delatnosti: { type: Array },
    u_pdv_sistemu: { type: Boolean },
    ziro_racuni: { type: Array },
    broj_fiskalnih_kasa: { type: Number },
    broj_magacina: { type: Number },
    magacini_objekti: { type: Array },
    prvi_login: { type: Boolean },
    kase: { type: Array },
    status: { type: String },
    narucioci: { type: Array },
    artikli: { type: Array },
    cena_stanje: { type: Array },
    stat: { type: String },
    kategorije: { type: Array },
    tip_korisnika: { type: String }
})

export default mongoose.model('PreduzeceModel', Preduzece, 'preduzeca');