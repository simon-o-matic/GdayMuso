'use strict';

const express = require('express');

// Constants
const PORT = process.env.PORT;
const HOST = "0.0.0.0"

// App
const app = express();
app.get('/', (req, res) => {
    console.log("boo")
    res.send('Hello Muso');
  });
  
  app.get('/muso', (req, res) => {
      console.log("blah")
  res.send('Play that funky music white boy');
});

app.listen(PORT, HOST);
console.log(`Hello Muso Q running on http://${HOST}:${PORT}`);