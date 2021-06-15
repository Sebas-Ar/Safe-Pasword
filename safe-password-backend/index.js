// import packages
import express from 'express'
import mongoConnect from './database/mongoConnec.js'
import cors from 'cors'
import dontenv from 'dotenv'
import morgan from 'morgan'

//import routes
import userRouter from './routes/user.route.js'
import passwordRouter from './routes/pasword.route.js'
import tagRouter from './routes/tag.route.js'

// get .env
dontenv.config()

// Create app
const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// mongoDB conecction
mongoConnect(process.env.MONGODB_URI)

//routes
app.use('/user', userRouter)
app.use('/password', passwordRouter)
app.use('/tag', tagRouter)

// Initialize the App
app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
