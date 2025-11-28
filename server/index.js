const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const Question = require('./models/Question');
const Result = require('./models/Result'); // NEW

const app = express();
const PORT = 3000;

require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Mongo connection error:', err));


// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Quiz API is running');
});

// API route to get all questions from MongoDB
app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API route to submit answers and receive the score
app.post('/submit', async (req, res) => {
  try {
    const { name, answers: userAnswers } = req.body;

    const questions = await Question.find();
    let score = 0;

    userAnswers.forEach((ans, i) => {
      if (questions[i] && ans === questions[i].answer) {
        score++;
      }
    });

    const total = questions.length;

    // save result to MongoDB
    const resultDoc = new Result({ name, score, total });
    await resultDoc.save();

    res.json({ score, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a question by ID
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

// API route to add a new question
app.post('/questions', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
