import mongoose from 'mongoose'

export const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://anuragkhatiwada7:WqjyOmQgRgdD9M8P@cluster0.13p5a.mongodb.net/tatotiffin").then(()=>console.log("connected to database"))
}