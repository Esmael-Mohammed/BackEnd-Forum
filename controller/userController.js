
 bcrypt = require('bcrypt')
const {StatusCodes}=require('http-status-codes')

//db connection
const dbConnection=require("../db/dbConfig.js")
const jwt=require('jsonwebtoken')
const User = require('../models/User');

// Register
async function register(req, res) {
  const { username, firstName, lastName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    //12..8=fhki
    const user = await User.create({ username, firstName, lastName, email, password:hashedPassword });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


//login 
// login controller
async function login(req, res) {
  const { email, password } = req.body;
  try {
    // 1. Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid email or password' });
    }

    // 2. Compare plain password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid email or password' });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { userId: user.userId, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 4. Send response
    res.json({
      token,
      user: {
        id: user.userId,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}




async function logout(req, res) { 
  try { 
    // If stateless: just tell client to remove token 
    res 
    .status(StatusCodes.OK) 
    .json({ success: true, message: "User logged out successfully" }); 
  
  } catch (error) { 
    res .status(StatusCodes.INTERNAL_SERVER_ERROR) 
    .json({ success: false, error: error.message }); 
  } 
}

async function checkUser(req, res) { 
    try { 
        // req.user comes from authMiddleware 
          const { userId } = req.user; 
        // Fetch user from DB 
        const user = await User.findByPk(userId, { attributes: ['userId', 'username', 'firstName', 'lastName', 'email'] }); 
              if (!user) { 
              return res.status(StatusCodes.NOT_FOUND).json({ msg: 'User not found' }); 
              } res.json({ user }); 
        } catch (error) { 
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message }); 
     } 
}
module.exports = { register, login, logout,checkUser };