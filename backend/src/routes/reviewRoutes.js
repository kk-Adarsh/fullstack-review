const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Define the routes for reviews
router.post('/', reviewController.createReview);
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.put('/:id', reviewController.updateReviewById);
router.delete('/:id', reviewController.deleteReviewById);

module.exports = router;
