const express=require('express');
const router=express.Router();
//authentication  middleware
const authMiddleware=require("../middleware/auth.js")

//user controllers 

const {register,login,logout,checkUser}=require("../controller/userController")

// register route
router.post('/register',register)


// login user
router.post('/login',login)


router.delete('/logout',logout)

//check user
router.get('/check',authMiddleware,checkUser)


module.exports=router;