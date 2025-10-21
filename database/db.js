require('dotenv').config()
const mongoose =require('mongoose')

const connectToDatabase = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected Successfully!");
        
    } catch (error) {
        console.log('MongoDB Connection failed: ',error);
    
    }
}

module.exports =connectToDatabase