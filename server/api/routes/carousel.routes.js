const express = require('express');
const CarouselController = require('../controllers/carousel.controller');
const authenticateAdmin = require('../middlewares/authenticate');
const router = express.Router();

router.get('/api/public/carousel', CarouselController.getAllSlides);
router.post('/api/admin/carousel', authenticateAdmin, CarouselController.createSlide);
router.put('/api/admin/carousel/:id', authenticateAdmin, CarouselController.updateSlide);
router.delete('/api/admin/carousel/:id', authenticateAdmin, CarouselController.deleteSlide);

module.exports = router;
