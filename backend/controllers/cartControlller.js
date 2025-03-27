import userModel from "../models/userModel.js";

//add to cart
const addToCart  = async(req,res)=>{
    try{
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(!userData){
            return res.status(404).json({
                success: false,
                message:"NO user found"
            })
        }
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.status(200).json({
            success: true,
            message:"Added to cart"
        })
    }catch(error){
        console.log(error);
        res.json({
            success: false,
            message:"ERROR"
        })
    }
}

//remove items from user cart
const removeFromCart = async(req,res)=>{
    try{
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
           cartData[req.body.itemId]-=1
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.status(200).json({
            success: true,
            message: "Item successfully removed from the cart"
        })
    }catch(err){
        console.log(err);
        res.json({
            success:false,
            message: "ERROR"
        })
    }

}

//fetch user cart data
const getCart = async(req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData){
            res.status(404).json({
                success: false,
                message: "No items availale"
            })
        }else{
            res.status(200).json({
                success: true,
                data: cartData
            })
        }

    }catch(error){
        console.log(error);
        res.json({
            success:false,
            message: "ERROR"
        })
    }

}

export {addToCart,removeFromCart,getCart}