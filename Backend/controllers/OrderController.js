const { json } = require("body-parser");
const orderModel = require("../models/OrderModel");
const userModel = require("../models/UserModel");
const Stripe = require("stripe");
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100, // Fixed price calculation
      },
      quantity: item.quantity,
    }));

    // Adding delivery charge as a separate item
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 2 * 100, // Fixed amount calculation
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url }); // Fixed key name
  } catch (error) {
    console.error("Order placement error:", error);
    res.json({ success: false, message: "Error processing payment" });
  }
};

const verifyOrder=async(req,res)=>{
    const{orderId,success}=req.body;
    try {
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})

        }
    } catch (error) {
        console.error(error);
        res.json({success:false,message:"Error"})

    }
}

//users orders for frontend

const userOrders=async (req,res)=>{
  try {
    const orders=await orderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})
  } catch (error) {
    console.error(error)
    res,json({success:false,message:"Error"})
  }
}

const listOrders=async(req,res)=>{
   try {
    const orders=await orderModel.find({});
    res.json({success:true, data:orders})
   } catch (error) {
    console.error(error)
    res.json({success:false, message:"Error"})

   }
}

const updateStatus=async(req,res)=>{
  try {
   await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
   res.json({success:true, message:"Status Updated"})
  } catch (error) {
   console.error(error)
   res.json({success:false, message:"Error"})

  }
}

module.exports = { placeOrder ,verifyOrder,userOrders,listOrders,updateStatus};
