const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
    course: { type: String, required: true },  // Course name
    author: { type: String, required: true },  // Username
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const RatingSchema = new mongoose.Schema({
    course: { type: String, required: true },
    rating: { type: Number, required: true }, // 1-5 stars
    review: { type: String },
    user: { type: String, required: true } // Username
});

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    progress: { type: Number, default: 0 },
    discussions: [DiscussionSchema],  // Store user discussions
    ratings: [RatingSchema]  // Store user ratings
});

module.exports = mongoose.model('User', UserSchema);