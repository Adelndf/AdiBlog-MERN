const User = require("../models/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// get all users
// Public
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log("Can't find users");
  }
});

// Create / Rigester new user
// Public
const createUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  // required fields !!
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please enter all required fields");
  }
  // Check if user already exists !!
  const emailExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });
  if (emailExists || usernameExists) {
    res.status(400);
    throw new Error("User/Email already exists");
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create user
  const newUser = await User.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: hashedPassword,
  });
  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data!!");
  }
});

// Login user
// Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  const validPassword = await bcrypt.compare(password, user.password);

  if (user && validPassword) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials!!");
  }
});

// Get single user
// Public
const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(500);
      throw new Error("User not found with this ID!!");
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500);
    throw new Error("User not found with this ID!!");
  }
});

// Update user
const updateUser = asyncHandler(async (req, res) => {
  const { username } = req.body;

  const usernameExists = await User.findOne({
    username: username.toLowerCase(),
  });
  if (usernameExists) {
    res.status(400);
    throw new Error(`Username ${username} already exists`);
  }

  if (req.body.userID === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        username: username.toLowerCase(),
      });
      res.status(200).json({ message: "Updated seccesfully" });
    } catch (err) {
      res.status(400);
      throw new Error("somthing is wrong");
    }
  } else {
    res.status(400);
    throw new Error("Can't do this action");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  if (req.body.userID === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User deleted seccesfully" });
    } catch (err) {
      res.status(400);
      throw new Error("somthing is wrong");
    }
  } else {
    res.status(400);
    throw new Error("Can't do this action");
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
};
