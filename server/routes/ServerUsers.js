var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found:', email); // Add this line
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user); // Add this line

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        console.error('Error during password comparison:', err); // Add this line
        return res.status(500).json({ message: 'Error during password comparison' });
      }
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
      } else {
        console.log('Incorrect password:', password); // Add this line
        res.status(401).json({ message: 'Incorrect password' });
      }
    });
  } catch (err) {
    console.error('Error during login process:', err); // Add this line
    res.status(500).json({ message: 'Error during login process' });
  }
});



router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the new user to the database
    const savedUser = await newUser.save();

    console.log('User saved to database:', savedUser); // Add this line to see the saved user in the console

    res.json({ message: 'User registered successfully', user: savedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error during registration process' });
  }
});


module.exports = router;


