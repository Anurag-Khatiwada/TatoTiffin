import { log } from "console";
import foodModel from "../models/foodModel.js"
import fs from 'fs';

//add food items
const addFood = async (req,res)=>{
   console.log(req.body)
     const {name, description, price, category} = req.body;
     console.log("File Received:", req.file); // Debugging line

     let image_filename = `${req.file.filename}`;    
     console.log(image_filename)

     const food = new foodModel({
        name,
        description,
        price,
        image: image_filename,
        category,
     })
     try{
        await food.save();
        res.status(200).json({
            success:true,
            message:'Food Added'
        })
     }catch(err){
        console.log(err)
        res.json({
            success: false,
            message: "Error"
        })
     }
     
}

//All food list

const listFood = async(req,res)=>{
   try{
      const foods = await foodModel.find({});
      if(!foods){
         res.status(404).json({
            success: false,
            message:"no food found"
         })
      }
      res.status(200).json({
         success: true,
         data: foods
      })

   }catch(err){
      console.log(err);
      res.json({
         success: false,
         message: "Error"
      })
      
   }

}

//remove food
const removeFood = async (req,res)=>{
   console.log(req.body)
   const {id} = req.body   
   try{
      const food = await foodModel.findById(id);
      if(!food){
         res.status(200).json({
            success: false,
            message: "No food item found"
         })
      }
      fs.unlink(`uploads/${food?.image}`,()=>{});

      await foodModel.findByIdAndDelete(id)
      res.status(200).json({
         success: true,
         message: "Food removed"
      })
   }catch(err){
      console.log(err);
      res.json({
         success:false,
         message: "Error"
      })
      
   }

}
export {addFood, listFood, removeFood}