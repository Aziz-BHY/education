const User = require("../models/userModel");

const InitAdmin = async () => {
  try {
    const user = await User.findOne({ role: "admin" });
    if(!user){
        await User.create({
            name: "admin",
            email: "azizbenhadjyahia99@gmail.com",
            password: "password123",
            role: "admin",
          });
    }
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = InitAdmin