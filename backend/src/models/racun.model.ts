import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema

let Racun = new Schema({
    stavke: { type: Array },
    nacin_placanja: { type: String },
    iznos: { type: Number },
    naziv_preduzeca: { type: String },
    naziv_objekta: { type: String },
    korisnicko_ime_preduzeca: { type: String },
    broj_licne_karte: Number,
    narucioc: { type: Object },
    datum: { type: String },
    podaci_o_kupcu: { type: Object },
    ukupan_porez: { type: Number },
    time: { type: Number }
})

export default mongoose.model('RacunModel', Racun, 'racuni');