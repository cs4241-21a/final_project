var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../schemas/User');

const loginCookieName = 'loginCookie';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ hello: 'hello' });
});

// Post request to login
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.json({ error: "All required feilds not filled out." });
    return;
  }

  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    res.json({ error: { username: `User with ${username} does not exist.` } });
    return;
  }

  const match = await bcrypt.compare(password, existingUser.passwordHash);
  if (!match) {
    res.json({
      error: { password: 'Password Does Not Match' }
    });
    return;
  }

  // login success
  res.cookie(loginCookieName, { userId: user._id }, { maxAge: 21600000 });
  res.json({ loggedIn: true });
  // res.redirect(`/user/${user._id}`);

});

// Post request to register
router.post('/register', async (req, res, next) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    res.json({ error: "All required feilds not filled out." });
    return;
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.json({ error: 'Username always exists.' });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  let newUser = await User({
    username,
    passwordHash
  });

  newUser = await newUser.save();

  res.cookie(loginCookieName, { userId: newUser._id }, { maxAge: 21600000 });
  res.json({ loggedIn: true });
  // res.redirect(`/user/${newUser._id}`);
});

module.exports = router;
