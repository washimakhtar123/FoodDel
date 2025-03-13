const foodModel = require("../models/FoodModel");
const fs=require('fs')

const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No image file uploaded",
        });
    }

    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category) {
        return res.status(400).json({
            success: false,
            message: "All fields are required: name, description, price, category",
        });
    }

    let image_filename = req.file.filename;

    const food = new foodModel({
        name,
        description,
        price,
        category,
        image: image_filename,
    });

    try {
        await food.save();
        res.status(201).json({
            success: true,
            message: "Food Added Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Food Addition Error",
        });
    }
};

// ✅ List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find();
        res.status(200).json({
            success: true,
            data: foods
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching food items",
        });
    }
};



// ✅ List all food items
const removeFood = async (req, res) => {
    try {
        const foods = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${foods.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({
            success: true,
            message:"Food Removed"
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Error food remove Time",
        });
    }
};
// ✅ Correct Export
module.exports = { addFood, listFood ,removeFood};
