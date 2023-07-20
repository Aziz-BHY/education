const asyncHandler = require("express-async-handler");
var jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const auth = asyncHandler(async (req, res) => {
  try{
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // get user by email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Email not Associated by any account");
  }
  if (password === user.password) {
    const token = jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });
    res.status(200).json({
      message: "success",
      data: token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
}
  catch(err){
    res.json({
      error: err.message
    })
  }
});



module.exports = {
  auth
};