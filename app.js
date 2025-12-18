import express from 'express';
import cors from 'cors';




const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.route('/').get((req,res)=>{
    res.send('Hello World');
})

app.listen(3000,()=>{
    console.log("server running on port 3000")
})