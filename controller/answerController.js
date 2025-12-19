// controller/answerController.js
const { StatusCodes } = require('http-status-codes');
const Answer = require('../models/Answer');
const User = require('../models/User');
const Question = require('../models/Question');

// Create a new answer
async function createAnswer(req, res) {
  try {
    const { questionId, answer } = req.body;
    const { userId } = req.user; // from JWT middleware

    const newAnswer = await Answer.create({ questionId, answer, userId });
    res.status(StatusCodes.CREATED).json(newAnswer);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
}

// Get all answers for a question
async function getAnswersByQuestion(req, res) {
  try {
    const { questionId } = req.params;
    const answers = await Answer.findAll({
      where: { questionId },
      include: [
        { model: User, attributes: ['userId', 'username', 'email'] },
        { model: Question, attributes: ['questionId', 'title'] }
      ]
    });
    res.json(answers);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

module.exports = { createAnswer, getAnswersByQuestion };
