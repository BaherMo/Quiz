const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');

const Question = require('./models/Question');
const Result = require('./models/Result');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Mongo connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
  res.send("Quiz API is running");
});

// Get all questions (safe — no answers)
app.get('/questions', async (req, res) => {
  try {
    const raw = await Question.find();

    const safe = raw.map(q => ({
      _id: q._id,
      question: q.question,
      options: q.options
    }));

    res.json(safe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit an answer (secure checking on backend)
app.post('/submit', async (req, res) => {
  try {
    const { id, answer, name } = req.body;

    const q = await Question.findById(id);
    if (!q) return res.status(404).json({ correct: false });

    const isCorrect = q.answer === answer;

    // Save individual result (optional)
    const resultDoc = new Result({
      name: name || "Anonymous",
      score: isCorrect ? 1 : 0,
      total: 1
    });

    await resultDoc.save();

    res.json({ correct: isCorrect });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new question
app.post('/questions', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a question
app.delete('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Question.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
