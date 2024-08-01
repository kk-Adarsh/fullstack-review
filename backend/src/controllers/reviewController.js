const Review = require('../models/review.model');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const review = new Review({
      title: req.body.title,
      content: req.body.content
    });
    const savedReview = await review.save();
    const reviews = await Review.find();
    const io = req.app.get('io')
    io.emit("created", reviews);

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a review by ID
exports.updateReviewById = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, content: req.body.content },
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    const io = req.app.get('io')
    io.emit("edited", review);

    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a review by ID
exports.deleteReviewById = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    const io = req.app.get('io')
    io.emit("deleted", req.params.id);

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
