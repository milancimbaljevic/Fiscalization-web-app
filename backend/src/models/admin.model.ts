import mongoose from 'mongoose'

const Schema = mongoose.Schema

let Admin = new Schema({
    ime: { type: String },
    prezime: { type: String },
    korisnicko_ime: { type: String },
    lozinka: { type: String },
    tip_korisnika: { type: String }
})

export default mongoose.model('AdminModel', Admin, 'admini');