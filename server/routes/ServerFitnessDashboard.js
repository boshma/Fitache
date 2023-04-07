const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Exercise, Meal, FitnessJournal } = require('../models/FitnessJournal');
const mongoose = require('mongoose');

const User = require('../models/User');

// Route to get fitness dashboard data for the logged-in user
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // Fetch data from your models and send it as a response
  res.send('Hello from the fitness dashboard');
});

// Route to add workout data
router.post('/add-workout', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // Add workout data to the database and send a response
});

// Route to add meal data
router.post('/add-meal', async (req, res, next) => {
  console.log('Received token:', req.headers.authorization);
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    console.log('Error:', err);
    console.log('User:', user);
    console.log('Info:', info);

    if (err) {
      return next(err);
    }

    if (!user) {
      if (info && info.message) {
        return res.status(401).json({ message: info.message });
      } else {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    }

    req.user = user;
    next();
  })(req, res, next);
}, async (req, res) => {
  try {
    const { name, carbs, proteins, fats } = req.body;

    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new meal
    const newMeal = {
      name,
      carbs,
      proteins,
      fats,
    };

    // Check if the user has any fitness journal pages
    if (user.fitnessJournal.pages.length === 0) {
      // Create a new fitness journal page for today
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      user.fitnessJournal.pages.push({ date: today, meals: [newMeal] });
    } else {
      // Add the new meal to the user's fitnessJournal
      user.fitnessJournal.pages[0].meals.push(newMeal);
    }

    // Save the updated user
    const updatedUser = await user.save();

    res.json({ message: 'Meal added successfully', meal: newMeal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while adding the meal' });
  }
});

module.exports = router;
