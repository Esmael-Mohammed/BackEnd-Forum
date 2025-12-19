// controller/questionController.js
const { StatusCodes } = require('http-status-codes');
const Question = require('../models/Question');
const User = require('../models/User');

// Create a new question
async function createQuestion(req, res) {
  try {
    const { title, description, tag } = req.body;
    const { userId } = req.user; // comes from JWT middleware

    const question = await Question.create({ title, description, tag, userId });
    res.status(StatusCodes.CREATED).json(question);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
}

// Get all questions
async function getQuestions(req, res) {
  try {
    const questions = await Question.findAll({
      include: { model: User, attributes: ['userId', 'username', 'email'] }
    });
    res.json(questions);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

// Get single question by ID
async function getQuestionById(req, res) {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id, {
      include: { model: User, attributes: ['userId', 'username', 'email'] }
    });

    if (!question) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Question not found' });
    }

    res.json(question);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

module.exports = { createQuestion, getQuestions, getQuestionById };
