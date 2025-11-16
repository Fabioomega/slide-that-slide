const express = require('express');
const router = express.Router();
const slidesController = require('../controllers/slidesController');
const auth = require('../middlewares/auth');

router.get('/listSlides', slidesController.listSlides); //http://localhost:3000/api/listSlides

router.post('/createSlides', auth, slidesController.createSlides);//como fazer ela ser protegida?

module.exports = router;
