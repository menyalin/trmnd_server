import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import errorMiddleware from './middlewares/error.js'
import router from './router/index.js'
import uploadController from './controllers/file.js'
import { jwtAuth } from './middlewares/auth.js'
import { mkdir, readdir, access }  from 'fs/promises'
import { constants } from 'fs' 
import { ConflictError } from './helpers/exceptions.js'

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      await readdir('./static/'+ req.userId)
    } catch (e) { 
      if (e.code === 'ENOENT') {
        await mkdir('./static/'+ req.userId)  
      }
    }
    cb(null, './static/'+req.userId)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  
})

dotenv.config() 
const app = express()
const upload = multer({ 
  storage, 
  limits: {
    fileSize: 5242880
  },
  fileFilter: async function(req, file, cb) {
    try {
      await access(`./static/${req.userId}/${file.originalname}`, constants.F_OK)
      cb(new ConflictError('Uploaded file already exists'))
    } catch (e) {
      cb(null, true)
    }  
  } 
})

app.use(cors({ credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use('/static', express.static('static'))
app.post('/api/upload', [jwtAuth, upload.single('file')], uploadController.uploadFile )
app.use('/api', router)

app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    app.listen(process.env.PORT, () => 
      console.log(`server listen on ${process.env.PORT} port`)
    )
  } catch(e) {
    console.log(e)
  }
}
await start()
