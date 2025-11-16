const express = require('express');
const router = express.Router();
const slidesController = require('../controllers/slidesController');

router.get('/createTestSlides', slidesController.listSlides);

module.exports = router;
