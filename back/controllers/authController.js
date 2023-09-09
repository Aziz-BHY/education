const asyncHandler = require("express-async-handler");
var jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { scryptSync, timingSafeEqual } = require("crypto");

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
  const [salt, hash] = user.password.split(".");
  const inputHash = scryptSync(req.body.password, salt, 64).toString("hex");

  const match = timingSafeEqual(Buffer.from(hash), Buffer.from(inputHash));

  if (!match) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
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