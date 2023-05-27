const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

exports.register = (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });

  res.status(201).json({ message: 'User registered successfully.', user });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
    const user = User.find({ username, password});

  if (user && user.password === password) {
    const token = jwt.sign({ username }, config.jwtSecret);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials.' });
  }
};
