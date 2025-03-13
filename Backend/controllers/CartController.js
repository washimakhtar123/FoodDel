
const userModel=require("../models/UserModel.js");

//add items to user Cart
const addToCart=async(req,res)=>{
   try {
    let userData=await userModel.findById(req.body.userId);
    let cartData=await userData.cartData;
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId]=1;
    }else{
        cartData[req.body.itemId] +=1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData})
    res.json({success:true,message:"Added To Cart"})
   } catch (error) {
    console.error(error);
    res.json({success:false,message:"Error Add To Cart Time"})
   }
}


//remove items to user Cart
const removeToCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;

        if(cartData[req.body.itemId]> 0){
            cartData[req.body.itemId] -=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Item Removed From Cart"})
    } catch (error) {
        console.error(error);
        res.json({success:false,message:"Item Removed Error"})

    }    
}


//featch user cart data
const getCart=async(req,res)=>{
    try {
    let userData=await userModel.findById(req.body.userId);
    let cartData=await userData.cartData;
    res.json({success:true, cartData})
    } catch (error) {
        console.error(error);
        res.json({success:false, message:"Error"})
    }
}


module.exports = { addToCart, removeToCart,getCart };
