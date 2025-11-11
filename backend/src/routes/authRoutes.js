const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/protegida', auth, (req, res) => {
  return res.json({
    mensagem: 'Acesso permitido!',
    usuario: req.user, 
  });
});

module.exports = router;
