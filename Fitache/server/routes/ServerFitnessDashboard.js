//server/routes/ServerFitnessDashboard.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Meal } = require('../models/FitnessJournal');
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

// Route to get meals for the current day
router.get('/meals-today', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pageIndex = user.fitnessJournal.pages.findIndex((page) => {
      const pageDate = new Date(page.date);
      return pageDate.getTime() === today.getTime();
    });

    let meals = [];

    if (pageIndex !== -1) {
      meals = user.fitnessJournal.pages[pageIndex].meals;
    }

    res.json(meals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while fetching meals' });
  }
});

// Route to add meal data
router.post('/add-meal', passport.authenticate('jwt', { session: false }), async (req, res) => {
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pageIndex = user.fitnessJournal.pages.findIndex((page) => {
      const pageDate = new Date(page.date);
      return pageDate.getTime() === today.getTime();
    });

    if (pageIndex === -1) {
      // Create a new fitness journal page for today
      user.fitnessJournal.pages.push({ date: today, meals: [newMeal] });
    } else {
      // Add the new meal to the user's fitnessJournal
      user.fitnessJournal.pages[pageIndex].meals.push(newMeal);
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

