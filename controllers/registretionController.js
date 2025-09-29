const emailValadation = require("../helpers/emailValidation");
const emailVaraification = require("../helpers/emailVarification");
const userSchema = require("../models/userSchema");
const bcrypt = require('bcrypt');
const crypto =require('crypto')
const registretionController = async (req, res) => {
  try{
    const { firstName, lastName, email, password} = req.body;
  if (!firstName || !lastName) {
    return res.json({ error: "first & last name is requred" });
  }
  if (!email) {
    return res.json({ error: "email is requred" });
  }
  if (!emailValadation(email)) {
    return res.json({ error: "Plaease enter a valid email" });
  }
  const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }
    if (!password) {
      return res.json({ error: "Password is required" });
    }
    const otp = crypto.randomInt(100000,999999).toString()
    const otpExpiry = new Date(Date.now() + 10*60*1000)
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userSchema({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      otp,
      otpExpiry
    });
    emailVaraification(email , otp)
  await user.save()
  
 res.json({
    message: "registration succesfully done",
    status: "success",
  });
  }catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  
};
module.exports = registretionController;
