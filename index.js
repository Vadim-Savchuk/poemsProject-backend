import express  from 'express'
import mongoose from 'mongoose'
import cors     from 'cors'
import dotenv   from 'dotenv'

import authRoute from './routes/auth.js'
import poemRoute from './routes/poem.js'

const app = express()
      dotenv.config()

// Constants
const PORT    = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoute)
app.use('/api/poem', poemRoute)

async function start () {
    try {
        mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.19psqca.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
        )

        app.listen(PORT, error => {
            if(error) console.log(`Server not started. Error: ${error}`);
            
            console.log('Server started it`s OK');
        })

    } catch (error) {
        console.log(`Server not started. Error: ${error}`);
    }
}

start()