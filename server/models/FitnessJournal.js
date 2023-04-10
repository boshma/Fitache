// server/models/FitnessJournal.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseSetSchema = new Schema({
  name: String,
  repetitions: Number,
  weight: Number,
});

const mealSchema = new Schema({
  name: String,
  proteins: Number,
  carbs: Number,
  fats: Number,
});

const fitnessJournalPageSchema = new Schema({
  date: Date,
  exercises: [exerciseSetSchema],
  bodyWeight: Number,
  meals: [mealSchema],
});


const fitnessJournalSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  pages: [fitnessJournalPageSchema],
});



module.exports = {
  Exercise: mongoose.model('Exercise', exerciseSetSchema),
  Meal: mongoose.model('Meal', mealSchema),
  FitnessJournalPage: mongoose.model('FitnessJournalPage', fitnessJournalPageSchema),
  FitnessJournal: mongoose.model('FitnessJournal', fitnessJournalSchema),
  fitnessJournalSchema, // Add this line to export the schema directly
};


