// models/Question.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');
const User = require('./User');

const Question = sequelize.define('Question', {
  questionId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.STRING(500), allowNull: false },
  tag: { type: DataTypes.STRING(50) },
}, {
  tableName: 'questions',
  timestamps: false,
});

Question.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Question, { foreignKey: 'userId' });

module.exports = Question;
