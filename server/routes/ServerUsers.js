// server/routes/ServerUsers.js

const { jwtSecret } = require("../../config");
var express = require("express");
var router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const FitnessJournal = require("../models/FitnessJournal").FitnessJournal;
``


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user);

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        console.error("Error during password comparison:", err);
        return res
          .status(500)
          .json({ message: "Error during password comparison" });
      }
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, jwtSecret, {
          expiresIn: "24h",
        });
        console.log("Generated token for user:", email);
        console.log("Generated token:", token);

        res.json({ message: "Login successful", token });
      } else {
        console.log("Incorrect password:", password);
        res.status(401).json({ message: "Incorrect password" });
      }
    });
  } catch (err) {
    console.error("Error during login process:", err);
    res.status(500).json({ message: "Error during login process" });
  }
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    // Create a new FitnessJournal object
    const newFitnessJournal = new FitnessJournal({
      pages: [],
      userId: newUser._id, // Assign the user's ID to the FitnessJournal's userId field
    });

    // Save the FitnessJournal to the database
    await newFitnessJournal.save();

    // Assign the newly created FitnessJournal to the user
    newUser.fitnessJournal = newFitnessJournal;

    const savedUser = await newUser.save();

    console.log("User saved to database:", savedUser);

    res.json({ message: "User registered successfully", user: savedUser });
  } catch (err) {
    console.error("Error during registration process:", err); // Add this line
    res.status(500).json({ message: "Error during registration process" });
  }
});


module.exports = router;
