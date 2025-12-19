
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
    const user = await User.create({ username, firstName, lastName, email, password: hashedPassword });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


//login 
async function login(req, res) { 
  const { email, password } = req.body; try {
     // 1. መጀመሪያ Find user በ email 
  const user = await User.findOne({ where: { email } }); 
    if (!user) {
     return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'መጀመሪያ ዪመዝገቡ Invalid credentials' }); 
    } 
  // 2. ከዛ Compare password with hashed password in DB 
      const isMatch = await bcrypt.compare(password, user.password); 
      if (!isMatch) { 
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: ' እረ ፓስዎርድ አስተካክል Invalid credentials' });
       } 
  // 3. Create JWT token 
      const token = jwt.sign( {
         userId: user.userId, username: user.username }, process.  env.JWT_SECRET, { expiresIn: '1h' } ); 
  // 4. በመጨረስሃም Send response 
     res.json({ 
      token, user: { 
        id: user.userId, username: user.username, email: user.email 
         } 
      });
  } 
  catch (error) { 
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message }); 
   }  
}



async function logout(req, res) { 
  try {
     // If you’re not storing sessions, just tell client to remove token 
     res.status(StatusCodes.OK).json({ msg: 'User logged out successfully' }); 
    } catch (error) { 
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message }); 
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