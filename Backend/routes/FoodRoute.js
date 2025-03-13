const express = require("express");
const multer = require("multer");
const {addFood,listFood,removeFood} = require("../controllers/FoodController");

const foodRouter = express.Router();

// ✅ Corrected Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)

module.exports = foodRouter;
