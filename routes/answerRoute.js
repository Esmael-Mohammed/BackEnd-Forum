// routes/answerRoute.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { createAnswer, getAnswersByQuestion } = require('../controller/answerController');

// Post an answer (protected)
router.post('/', authMiddleware, createAnswer);

// Get answers for a question
router.get('/:questionId', getAnswersByQuestion);

module.exports = router;
