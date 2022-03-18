import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import errorMiddleware from './middlewares/error.js'
import router from './router/index.js'


dotenv.config() 
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      // useNewUrlParser: true
    })
    app.listen(process.env.PORT, () => 
      console.log(`server listen on ${process.env.PORT} port`)
    )
  } catch(e) {
    console.log(e)
  }
}
await start()
