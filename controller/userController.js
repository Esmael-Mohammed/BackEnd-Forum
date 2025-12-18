
 bcrypt = require('bcrypt')
const {StatusCodes}=require('http-status-codes')


//db connection
const dbConnection=require("../db/dbConfig.js")


const jwt=require('jsonwebtoken')


const User = require('../models/User');

// Register
async function register(req, res) {
  const { username,firstName,lastName,email,password } = req.body;
  const user = await User.create({ username, firstName, lastName, email, passwordHash: password });
  res.json(user);
}



async function login(req, res) {


}


async function  logout  (req, res)  {
  
}

async function checkUser(req, res) {
  const username=req.user.userName;
  const userid=req.user.userid;
  res.status(StatusCodes.OK).json({msg:"valid user",username,userid})
}
module.exports = { register, login, logout,checkUser };