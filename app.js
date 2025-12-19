require('dotenv').config()
const express=require('express');
const cors=require('cors');

const app=express();

const port = process.env.PORT || 5200;
app.use(cors())

// json middleware to extract json data
app.use(express.json())


//db connection
const sequelize =require("./db/dbConfig.js")


// user routers middleware file
const userRoutes=require("./routes/userRoute")
app.use('/api/users', userRoutes);

// authentication middleWare
const authMiddleware=require("./middleware/auth.js")

const questionRoutes = require('./routes/questionRoute');
app.use('/api/questions', questionRoutes);

const answerRoutes = require('./routes/answerRoute');
app.use('/api/answers', answerRoutes);


async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // creates tables if not exist
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect:', error.message);
  }
}

start();

