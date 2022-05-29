const endpoints = require('./src/routes');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const config = require('./config')

const app = express();

// Temporary imports for db initialization
const Game = require('./src/models/game');
const User = require('./src/models/user');


// Connect to MongoDB database
async function connectToDB() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect.apply(this, config.MongoDBConnectionString);
  await mongoose.connection.useDb("chess");
  console.log("MongoDB succesful connection");
}

// Http server config
async function startHttpServer() {
  app.use(express.json());
  app.use(cors());

  app.use('/', endpoints);

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

// TODO: real time connection for the chess table???
async function startWebSocketServer() {
}

// Initialize application and start listening
// Do not start http server until previous services have started
async function startUp() {
  await Promise.all([connectToDB()]);

  // Dummy insert to initialize db
  console.log("Insert new game into games");
  const newGame = Game({
    createdAt: 1650664337511,
    lastMoveAt: 1650664337511,
    moves: ["dxe5"],
    ownerUserName: "noname",
    ownerColor: "black",
    winner: "true"
});
  await newGame.save();

  startHttpServer();
  startWebSocketServer();
}

startUp();
