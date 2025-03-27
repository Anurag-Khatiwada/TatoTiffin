import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRoute from "./routes/foodRoute.js";
import userRoute from "./routes/userRoute.js"
import cartRoute from "./routes/cartRoute.js"
import orderRoute from './routes/orderRoute.js'
import "dotenv/config"

//app config
const app = express();
const port= 4000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Handles form-data

// Serve static files (important for viewing uploaded images)
app.use('/images', express.static('uploads'));

//DB connection
connectDB();

//endpoint
app.use("/api/food", foodRoute)
app.use("/api/user",userRoute)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderRoute)


//run backend
app.listen(port,()=>{
    console.log(    `Server is runnning on ${port}`
    );
})

//mongodb+srv://anuragkhatiwada7:<db_password>@cluster0.13p5a.mongodb.net/?