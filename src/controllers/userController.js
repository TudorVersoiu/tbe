const jwt = require('jsonwebtoken');
const jwtconfig = require('../../config');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Login endpoint 
module.exports.login = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let pass = req.body.password;

  let dbUser = await User.findOne(
    {$or: [
      {email: email},
      {username: username}
    ]}); // Find either by email or username

  try {
    if (!dbUser) throw "Wrong username or password";
    let result = await bcrypt.compare(pass, dbUser.password);
    if (!result) throw "Wrong password!";
  } catch (e) {
    res.send({error: e});
    return;
  }

  let token = jwt.sign(
    {
      username: username,
      email: dbUser.email,
      role: dbUser.role
    },
    Buffer.from(jwtconfig.SecretKey, 'base64')
  );

  res.json({accessToken: token});
}

// Register endpoint
module.exports.register = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  let existingUserEmail = await User.findOne(
    {$or: [
      {email: email},
      {username: username}
    ]});

  if ( existingUserEmail ) {
    res.status(409).send(
      {error: "Username or email already in use!"}
    );
    return;
  }

  let password_hash = await bcrypt.hash(password, 8);

  let newUser = new User(req.body);
  newUser.password = password_hash;

  newUser.save();
  res.send({result: "Entity saved"});
}
