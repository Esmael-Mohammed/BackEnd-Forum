// routes/questionRoute.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { createQuestion, getQuestions, getQuestionById } = require('../controller/questionController');

// Create question (protected)
router.post('/question', authMiddleware, createQuestion);

// Get all questions
router.get('/', getQuestions);

// Get single question
router.get('/:id', getQuestionById);

module.exports = router;
