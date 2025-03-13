const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken"); // Fixed typo
const bcrypt = require("bcrypt");
const validator = require("validator"); // Fixed typo
const dotenv = require("dotenv");
dotenv.config();

// Function to create JWT token
const createToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" }); //Added expiration time
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExist = await userModel.findOne({email});
    if (userExist) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid Email",
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password (at least 8 characters)",
      });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword, // Save hashed password
    });

    // Save user to database
    const user = await newUser.save();

    // Create JWT token
    const token = await createToken(user._id);
    res.json({ success: true, token, message: "User registered successfully" });
  } catch (error) {
    console.error(error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    res
      .status(500)
      .json({
        success: false,
        message: "Error occurred during user registration",
      });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = await createToken(user._id);

    res.json({ success: true, token, message: "User logged in successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error occurred during login" });
  }
};

module.exports = { loginUser, registerUser };

