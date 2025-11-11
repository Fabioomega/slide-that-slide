const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const onlyAdmin = require('../middlewares/onlyAdmin');

// Esse é um exemplo de uma rota protegida com apenas acesso do admin (pode ser deletada ao decorrer do projeto visto que é um exemplo) 

router.get('/dashboard', auth, onlyAdmin, (req, res) => {
  res.json({ mensagem: 'Bem-vindo, admin!' });
});

module.exports = router;
