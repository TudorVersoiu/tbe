const router = require('express').Router();
const authenticateJWT = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const userController = require('./../controllers/userController');
const meta = require('../middleware/meta');

router.route('/login').post(userController.login);
router.route('/register').post(userController.register);

router.route('/test').post([
  authenticateJWT,
  authorization((user) => { return user.role == 'admin'; }),
  userController.register
]);

module.exports = router;
