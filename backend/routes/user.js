const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('../models/user'); // Ensure correct path
const Rating = require('../models/rating');
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});

// Login User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        console.log("Login successful. Returning:", { username: user.username, token });

        res.json({ message: "Login successful", username: user.username, token });
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
});

router.get('/progress/:username', async (req, res) => {
    try {
        const { username } = req.params;
        console.log("API Received Progress Request for:", username);

        const user = await User.findOne({ username });
        if (!user) {
            console.warn("User not found:", username);
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("Found user. Returning progress:", user.progress);
        res.json({ progress: user.progress });
    } catch (err) {
        console.error("Error fetching progress:", err);
        res.status(500).json({ message: 'Error fetching progress', error: err.message });
    }
});

router.put('/progress/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const { progress } = req.body;

        console.log(`Updating progress for ${username} to ${progress}%`);

        const user = await User.findOneAndUpdate({ username }, { progress }, { new: true });

        if (!user) {
            console.warn("User not found:", username);
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("Progress updated successfully:", user.progress);
        res.json({ message: 'Progress updated successfully', progress: user.progress });
    } catch (err) {
        console.error("Error updating progress:", err);
        res.status(500).json({ message: 'Error updating progress', error: err.message });
    }
});

// POST: Add Discussion Post
router.post('/discussion', async (req, res) => {
    try {
        const { course, author, message } = req.body;
        if (!course || !author || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ username: author });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const newPost = { course, author, message };
        user.discussions.push(newPost);
        await user.save();

        res.status(201).json({ message: 'Post added successfully', post: newPost });
    } catch (err) {
        res.status(500).json({ message: 'Error saving post', error: err.message });
    }
});

//  GET: Get Discussions for a Course
router.get('/discussion/:course', async (req, res) => {
    try {
        const { course } = req.params;
        const discussions = await User.find({ "discussions.course": course }, { discussions: 1 });

        if (!discussions.length) {
            return res.status(404).json({ message: 'No discussions found for this course' });
        }

        const allPosts = discussions.flatMap(user => user.discussions.filter(d => d.course === course));
        res.json(allPosts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching discussions', error: err.message });
    }
});

//  POST: Save a rating
router.post('/rate', async (req, res) => {
    try {
        const { course, rating, review, user } = req.body;

        if (!course || !rating || !user) {
            return res.status(400).json({ message: 'Missing rating data.' });
        }

        const newRating = new Rating({ course, rating, review, user });
        await newRating.save();

        res.status(201).json({ message: 'Rating submitted successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error saving rating', error: err.message });
    }
});

//  GET: Fetch all ratings for a course
router.get('/rate/:course', async (req, res) => {
    try {
        const { course } = req.params;
        const ratings = await Rating.find({ course });

        res.json(ratings);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching ratings', error: err.message });
    }
});


module.exports = router;
