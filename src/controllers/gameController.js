const dbClient = require('mongodb');
const gameService = require('../services/gameService');
const Game = require('../models/game');
const Engine = require('node-uci').Engine;
const chess = require('chess'); 

module.exports.lichessDownload = async (req, res) => {
  let games = await gameService.fetchFromLichessUser('TooDoor');

  try {
    let result = await Game.insertMany(games);
    console.log(result);
  } catch ( e ) {
      res.send(e);
  }
  res.send({success: "true"});
}

module.exports.getUserGames = async (req, res) => {
  console.log("called");
  let username = req.query.username;
  console.log(username);

  let games = await Game.find(
    {ownerUserName: username}
  );

  res.send(games);
}

module.exports.analyseGame = async (req, res) => {
  console.log(`Analyzing game ${req.body.gameId}`);
  let dbGame = await Game.findOne({_id: req.body.gameId});

  const engine = new Engine('stockfish');
  const chessGame = chess.create();
  let moves = dbGame.moves;
  let long_moves = [];


  await engine.init();
  console.log("Engine initialized");

  await engine.setoption("MultiPV", "20");
  await engine.isready();

  dbGame.analysis = [];

  for ( let move of moves ) {
    const analysis_depth = 14;

    let move_details = chessGame.move(move).move;
    let long_move = `${move_details.prevSquare.file}${move_details.prevSquare.rank}${move_details.postSquare.file}${move_details.postSquare.rank}`;

    long_moves.push(long_move);
    await engine.position("startpos", long_moves);
    let analysis_results = await engine.go({depth: analysis_depth});

    analysis_results = analysis_results.info;
    analysis_results = analysis_results.filter((pv) => {return pv.score && pv.depth && pv.depth == analysis_depth});

    analysis_results = analysis_results.map(
      (pv) => {
        
        return {score: pv.score.value, moves: pv.pv.split(' ')};
      }
    );
    
    dbGame.analysis.push(analysis_results);
  }

  dbGame.save();
  res.send({success: true});
}

module.exports.getAll = (req, res) => {
  
}

module.exports.addOne = (req, res) => {
  
}

module.exports.getById = (req, res) => {

}
