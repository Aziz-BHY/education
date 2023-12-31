const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const fs = require("fs");
const { scryptSync, randomBytes } = require("crypto");
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
  try{
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Please include all fields");
  }
  // Find if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  // Create user
  const user = await User.create({
    name,
    email,
    password: `${salt}.${hash}`,
    role,
  });

  if (user) {
    if(user.role == "student"){
      await fs.mkdirSync(`./uploads/students/${user._id}`);
    }
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
}
  catch(err){
    res.json({
      error: err.message
    });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  try{
    const users = await User.find({role: req.params.role});
    res.json(users);
  }
  catch(err){
    res.json({
      error: err.message
    });
  }
});

const deleteUser = asyncHandler(async (req, res) => {

  try{
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }
    await user.deleteOne({_id: req.params.id});
    res.json({ id: req.params.id });
  }
  catch(err){
    res.json({
      error: err.message
    });
  }
})

const updateUser = asyncHandler(async (req, res) => {
  try{
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }
    let password = req.body.password
    if(req.body.password){
      const salt = randomBytes(16).toString("hex");
      const hash = scryptSync(password, salt, 64).toString("hex");
      password =  `${salt}.${hash}`
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      ...req.body,
      password: password
    }, {
      new: true,
    });
    res.json(updatedUser);
  }
  catch(err){
    res.json({
      error: err.message
    });
  }
})

module.exports = {
    createUser,
    getUsers,
    deleteUser,
    updateUser
};