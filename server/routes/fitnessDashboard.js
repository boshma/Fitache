const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Exercise, Meal, FitnessJournal, User } = require('../models/FitnessJournal');


// // Route to get fitness dashboard data for the logged-in user
// router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   // Fetch data from your models and send it as a response
//   res.send('Hello from the fitness dashboard');
// });

router.get('/', async (req, res) => {
  // Fetch data from your models and send it as a response
  res.send('Hello from the fitness dashboard');
});



// Route to add workout data
router.post('/add-workout', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // Add workout data to the database and send a response
});

// Route to add meal data
// router.post('/add-meal', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   try {
//     const { name, calories, protein, carbs, fat } = req.body;

//     const newMeal = new Meal({
//       user: req.user.id,
//       name,
//       calories,
//       protein,
//       carbs,
//       fat
//     });

//     const savedMeal = await newMeal.save();

//     res.json({ message: 'Meal added successfully', meal: savedMeal });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'An error occurred while adding the meal' });
//   }
// });
router.post('/add-meal', async (req, res) => {
  try {
    const { carbs, proteins, fats } = req.body;

    // You can replace req.user.id with a hardcoded value or some other value, since we're not using Passport anymore
    const userId = "64263570fa1f490305d8ab9a";
                    
    // db.users.find({"_id": ObjectId("664263570fa1f490305d8ab9a")}).pretty()

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new meal
    const newMeal = {
      carbs,
      proteins,
      fats,
      totalCalories: 0, // Add default calories, you can update it later if needed
    };

    // Add the new meal to the user's fitnessJournal
    user.fitnessJournal.pages[0].meals.push(newMeal);

    // Save the updated user
    const updatedUser = await user.save();

    res.json({ message: 'Meal added successfully', meal: newMeal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while adding the meal' });
  }
});









module.exports = router;
