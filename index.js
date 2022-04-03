const endpoints = require('./src/routes');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();


async function connectToDB() {
  // local DB, so no auth
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/chess", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
}

async function startHttpServer() {
  app.use(express.json());
  app.use(cors());

  app.use('/', endpoints);

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

async function startWebSocketServer() {
  // TODO: implement
}

connectToDB();
startHttpServer();
startWebSocketServer();
