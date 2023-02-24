import express from 'express'
import { AdminController } from '../controllers/admin.controller'

const adminRouter = express.Router()

adminRouter.route('/prijava').post((req,res)=>{
    new AdminController().prijava(req,res)
})


adminRouter.route('/dodajAdmina').post((req,res)=>{
    new AdminController().dodajAdmina(req,res)
})

adminRouter.route('/dohvatiZahtjeve').post((req,res)=>{
    new AdminController().dohvatiZahtjeve(req,res)
})

adminRouter.route('/odbiIliPrihvatiPreduzece').post((req,res)=>{
    new AdminController().odbiIliPrihvatiPreduzece(req,res)
})

adminRouter.route('/dohvatiIzvjestaj').post((req,res)=>{
    new AdminController().dohvatiIzvjestaj(req,res)
})

export default adminRouter