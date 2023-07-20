const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

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

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  if (user) {
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



module.exports = {
    createUser
};