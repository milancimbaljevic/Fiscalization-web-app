import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import preduzeceRouter from './routes/preduzece.routes'
import artikalRouter from './routes/artikal.routes';
import kupacRouter from './routes/kupac.routes';
import adminRouter from './routes/admin.routes';

const app = express();
app.use(cors())
app.use(express.json())

app.use(express.static('slike'))
app.use(express.static('slike_artikli'))

mongoose.connect('mongodb://localhost:27017/pia_projekat')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router()

router.use('/preduzece', preduzeceRouter)
router.use('/artikal', artikalRouter)
router.use('/kupac',kupacRouter)
router.use('/admin',adminRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));