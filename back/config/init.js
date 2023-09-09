const User = require("../models/userModel");

const InitAdmin = async () => {
  try {
    const user = await User.findOne({ role: "admin" });
    if(!user){
        await User.create({
            name: "admin",
            email: "azizbenhadjyahia99@gmail.com",
            password: "ce2a394651eb993aeeb19edf77238014.1779397363feba3a7ce78581ce6eded0daee6edddb906cd80120ebeec965a5d5ad81939f7e1578a095cbc4cb81d25c62d752a1dbab9f302034c6ddaaa46f5aca",
            role: "admin",
          });
    }
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = InitAdmin