// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');

const User = sequelize.define('User', {
  userId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING(30), allowNull: false },
  firstName: { type: DataTypes.STRING(30), allowNull: false },
  lastName: { type: DataTypes.STRING(30), allowNull: false },
  email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
