const express = require('express');
const router = express.Router();
const slidesController = require('../controllers/slidesController');
const sseController = require('../controllers/sseController');
const auth = require('../middlewares/auth');

router.get('/listSlides', slidesController.listSlides); //http://localhost:3000/api/listSlides

router.post('/createSlides', auth, slidesController.createSlides);//not sure about auth

router.get('/onSlideChange', sseController.eventsHandler); //http://localhost:3000/api/onSlideChange

module.exports = router;
