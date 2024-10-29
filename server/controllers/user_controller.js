import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";
import User from "../models/User.js";

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const generateToken = (userId) => {
  return jwt.sign({ userId }, "ABHISEKH", {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Joi validation
  const { error } = registerSchema.validate({ name, email, password });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    // Check if user already exists
    const IsUserAlreadyExist = await User.findOne({ email });
    if (IsUserAlreadyExist) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists!! Please Log In",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // Generate token and send in a cookie
      const token = generateToken(newUser._id);
      res.cookie("token", token, {
        httpOnly: true,
        withCredentials: true,
      });
      res.status(201).json({
        success: true,
        message: "User Registration Successful",
        userData: {
          name: newUser.name,
          email: newUser.email,
          _id: newUser._id,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return res.status(401).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    // Check if user exists
    const getUser = await User.findOne({ email });
    if (!getUser) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email",
      });
    }

    // Compare passwords
    const checkAuth = await bcrypt.compare(password, getUser.password);
    if (!checkAuth) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    // Generate token
    const token = generateToken(getUser._id);

    // Set the token in an HTTP-only cookie
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true, // Secure the cookie
      secure: process.env.NODE_ENV === "production", // Add 'secure' in production
    });

    // Send success response
    res.status(200).json({
      success: true,
      message: "User logged in",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

export const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    withCredentials: true,
    httpOnly: true,
  });
  return res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
};
