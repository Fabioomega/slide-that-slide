const express = require('express');
const router = express.Router();
const slidesController = require('../controllers/Slides');

router.get('/listSlides', slidesController.listSlides);

module.exports = router;
