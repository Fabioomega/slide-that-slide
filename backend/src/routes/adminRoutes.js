const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const onlyAdmin = require('../middlewares/onlyAdmin');

router.get('/dashboard', auth, onlyAdmin, (req, res) => {
  res.json({ mensagem: 'Bem-vindo, admin!' });
});

module.exports = router;
