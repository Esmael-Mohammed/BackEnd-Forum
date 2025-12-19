// models/Answer.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');
const User = require('./User');
const Question = require('./Question');

const Answer = sequelize.define('Answer', {
  answerId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  answer: { type: DataTypes.STRING(500), allowNull: false },
}, {
  tableName: 'answers',
  timestamps: false,
});

Answer.belongsTo(User, { foreignKey: 'userId' });
Answer.belongsTo(Question, { foreignKey: 'questionId' });

module.exports = Answer;
