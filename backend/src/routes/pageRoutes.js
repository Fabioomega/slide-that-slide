const express = require('express');
const path = require('path');
const router = express.Router();
const auth = require('../middlewares/auth');
// const onlyAdmin = require('../middlewares/onlyAdmin');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './../dist/src/pages/login.html'))
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, './../dist/src/pages/register.html'))
});

router.get('/editor', auth, (req, res) => {
  res.sendFile(path.join(__dirname, './../dist/src/pages/editor.html'))
});

router.get('/slides', (req, res) => {
  res.sendFile(path.join(__dirname, './../dist/src/pages/slide.html'))
});

module.exports = router;
