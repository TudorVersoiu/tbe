const router = require('express').Router();
const authenticateJWT = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const gameController = require('./../controllers/gameController');

router.route('/download').post([
  gameController.lichessDownload
]);

router.route('/getUserGames').get([
  authenticateJWT,
  gameController.getUserGames
]
);

router.route('/analyze').post(
  gameController.analyseGame
);

module.exports = router;
