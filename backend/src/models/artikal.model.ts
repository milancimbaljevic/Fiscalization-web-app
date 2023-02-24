import mongoose from "mongoose";

const Schema = mongoose.Schema

class Stanje {
    naziv_magacina_objekta: String
    nabavna_cijena: Number
    prodajna_cijena: Number
    tekuce_stanje_lagera: number
    min_zeljena_kol: Number
    maks_zeljena_kol: Number
}

let Artikal = new Schema({
    sifra: { type: String },
    naziv: { type: String },
    jedinica_mere: { type: String },
    stopa_poreza: { type: Number },
    proizvodjac: { type: String },
    tip: { type: Number },
    slika: { type: String },
    korisnicko_ime_preduzeca: { type: String },
    u_kategoriji: { type: Boolean },
    kategorija: { type: String },
    stanja: { type: Array }
})

export default mongoose.model('ArtikalModel', Artikal, 'artikli');