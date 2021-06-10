'use strict'

import express from 'express'
import Songbase from './src/songbase.js'
import cors from 'cors'

// Constants
const PORT = process.env.PORT || 8080
const HOST = '0.0.0.0'
const SONG_DB_NAME = 'songdatabase'

const app = express()
const songbase = Songbase(SONG_DB_NAME)

app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("G'day Muso. Try /song")
})

// todo: streaming/paging of long results
app.get('/songs', async (req, res) => {
    let allSongs = await songbase.getAllSongs()
    res.json({ songs: allSongs })
})

// todo: error handling, and duplicates
app.post('/song', async (req, res) => {
    console.log('song adding', req.body)
    songbase.addSong(req.body.song)
    res.send({ song: 'ok' })
})

const startup = () => {
    app.listen(PORT, HOST)
    console.log(`G'day Muso running on http://${HOST}:${PORT}`)

    if (!songbase.connect()) {
        console.error("Can't connect to the song database")
        process.exit(1)
    }

    console.log("G'day Muso database all sorted")
}

startup()
