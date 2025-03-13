const jwt=require("jsonwebtoken");
require('dotenv').config();


const authMiddleware=async (req,res ,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }

    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id;
        next();
    } catch (error) {
        console.error(error);
        res.json({success:false,message:"Error"})
    }
}

module.exports = authMiddleware;