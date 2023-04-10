//server\config\database.js

const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://bshmat425:Leagues69@fitjournal.xwdztbe.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
