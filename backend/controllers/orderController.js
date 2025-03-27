import userModel from "../models/userModel.js"
import orderModel from "../models/orderModel.js"
import Stripe from "stripe"
import "dotenv/config"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order for fontend
const placeOrder = async(req,res)=>{
    const frontend_url = "http://localhost:5173"
    const {items, amount, address} = req.body
    try{
        const newOrder = new orderModel({
            userId: req.body.userId,
            items,
            amount,
            address
        })
        await newOrder.save();

        //clearing cart items
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} }, { new: true });

        //creating line items for payment:
        const line_items = items.map((item)=>({
            price_data:{
                currency:"npr",
                product_data:{
                    name: item.name
                },
                unit_amount: item.price*100*120
            },
            quantity:item.quantity
        }))

        //pushing dilivery charges to line items
        line_items.push({
            price_data:{
                currency:"npr",
                product_data:{
                    name: "Delivery Charges"
                },
                unit_amount:2*100
            },
            quantity:1
        })

        //creating payment session
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,

        })

        res.status(200).json({
            success: true,
            session_url: session.url
        })

    }catch(err){
        console.log(err);
        res.json({
            success: false,
            message: "ERROR"
        })
    }
}


//verifying payments
const verifyOrder = async(req,res)=>{
    const {orderId,success} = req.body
    try{
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true},{new:true})
            res.status(200).json({
                success:true,
                message:"Paid"
            })
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success:false,
                message: "Not paid"
            })
        }
    }catch(err){
        res.json({
            success:false,
            message:"ERROR"
        })
    }

}

//get user's orders
const usersOrders = async (req,res)=>{
    
    try{
        const orders = await orderModel.find({userId:req.body.userId})
        if(!orders){
            res.status(404).json({
                success:false,
                message:"No orders available"
            })
        }
        res.status(200).json({
            success: true,
            data: orders
        })

    }catch(err){
        console.log(err)
        res.json({
            success: false,
            message: "ERROR"
        })
    }
}

//get orders of all the users
const getAllOrders = async (req,res)=>{
try{
    const allOrders = await orderModel.find();
    if(!allOrders){
        return res.status(404).json({
            success: false,
            message: "No any order placed"
        })
    }
    res.status(200).json({
        success: true,
        data: allOrders
    })

}catch(err){
    console.log(err);
    res.json({
        success: false,
        message: "ERROR"
    })
}
}

//update order status

const updateStatus = async (req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{
            status:req.body.status
        },{new:true})
        res.json({
            success: true,
            message: "Status Updated"
        })
    }catch(err){
        console.log(err)
        res.json({
            success: false,
            message:"ERROR"
        })
    }
}


export {placeOrder,verifyOrder,usersOrders,getAllOrders,updateStatus}