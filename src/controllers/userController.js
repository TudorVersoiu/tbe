const jwt = require('jsonwebtoken');
const jwtconfig = require('../../config');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// POST /api/users/login
// body => email + username + password
// onSuccess: {accessToken: token}
// onError: [message]
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
  } catch ( login_error ) {
    res.status(400).send([login_error]);
    return;
  }

  let token = jwt.sign(
    {
      username: username,
      email: dbUser.email,
      role: dbUser.role
    },
    Buffer.from(jwtconfig.JWTSecretKey, 'base64')
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
      ["Username or email already in use!"]
    );
    return;
  }

  let password_hash = await bcrypt.hash(password, 8);

  let newUser = new User(req.body);
  newUser.password = password_hash;


  try {
    await newUser.save();
    res.send({result: "Entity saved"});
  } catch (error) {
    // Validation failed, return error messages
    let error_list = [];
    Object.keys(error.errors).forEach((key) => {
      error_list.push(error.errors[key].message);
    });
    res.status(400).send(error_list);
  }
}
