const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    course: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String },
    user: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rating', RatingSchema);
