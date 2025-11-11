const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);

// exemplo de uma rota protegida (essa rota pode ser apagada no futuro visto que é um exemplo)
// PS: Utilizar esse padrão para outras rotas protegidas quando necessário

router.get('/protegida', auth, (req, res) => {
  return res.json({
    mensagem: 'Acesso permitido!',
    usuario: req.user, 
  });
});

module.exports = router;
