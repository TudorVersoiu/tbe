const express = require('express');
const cors = require('cors');
const endpoints = require('./src/routes');

const mongoose = require('mongoose');
const app = express();

async function start() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chess");
  
  app.use(express.json());
  app.use(cors());

  app.use('/', endpoints);

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

start();
