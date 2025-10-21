require('dotenv').config();
const express=require('express');
const analyzeString=require('./routes/analyzer-route');
const connectToDb=require('./database/db')

const app=express();

//middlewares
app.use(express.json())

//routes
app.use('/string',analyzeString)

//connect to db
connectToDb();
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}` );
    
})