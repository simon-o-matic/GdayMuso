'use strict'

import express from 'express'

import databaseConnect from './database.js'

// Constants
const PORT = process.env.PORT || 8080
const HOST = '0.0.0.0'

// App
const app = express()
app.get('/', (req, res) => {
    console.log('boo')
    databaseConnect('gday')
    res.send('Hello Muso')
})

app.get('/muso', (req, res) => {
    console.log('blah')
    res.send('Play that funky music white boy')
})

app.listen(PORT, HOST)
console.log(`Hello Muso Y running on http://${HOST}:${PORT}`)
