const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/db.js'); // Remove {} from the import
const foodRouter = require('./routes/FoodRoute.js');
const userRouter=require('./routes/UserRoute.js')
const cartRouter=require('./routes/CartRoute.js')
const orderRouter=require('./routes/OrderRoute')
require('dotenv').config();

// App configuration
const app = express();
const PORT =process.env.PORT||4000;

// Middleware
app.use(express.json());
app.use(cors());
const path = require("path");
app.use("/images", express.static(path.join(__dirname, "Uploads")));



// Database Connection
dbConnect(); 

//api end point
app.use("/api/food",foodRouter)
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
// app.use("/images",express.static('Uploads'))//line 13-14 se s hota hai aise bhi hosakta hai

// API Routes
app.get("/", (req, res) => {
    res.send("API working");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});
