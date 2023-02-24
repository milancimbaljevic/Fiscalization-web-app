import mongoose from 'mongoose'

const Schema = mongoose.Schema

let Kupac = new Schema({
    ime: { type: String },
    prezime: { type: String },
    korisnicko_ime: { type: String },
    lozinka: { type: String },
    telefon: { type: String },
    broj_licne_karte: { type: Number },
    tip_korisnika: { type: String }
})

export default mongoose.model('KupacModel', Kupac, 'kupci');