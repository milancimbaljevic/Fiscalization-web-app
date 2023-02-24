import mongoose from "mongoose";

const Schema = mongoose.Schema

let Odeljenje = new Schema({
    naziv_odeljenja: { type: String },
    korisnicko_ime_preduzeca: { type: String },
    naziv_preduzeca: { type: String },
    raspored_stolova: { type: Array },
})

export default mongoose.model('OdeljenjeModel', Odeljenje, 'odeljenja');