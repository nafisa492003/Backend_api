const userSchema = require("../models/userSchema");
const emailValadation = require("../helpers/emailValidation");
const bcrypt = require("bcrypt");
const logInController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.json({ error: "email is requred" });
    }
    if (!emailValadation(email)) {
      return res.json({ error: "Plaease enter a valid email" });
    }
    if (!password) {
      return res.json({ error: "Password is required" });
    }
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User is not found." });
    }
    if (user.isVerified !== true) {
      return res.json({ error: "User is not verified." });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid password" });
    }
    if (isPasswordCorrect) {
      //session token
      req.session.isVerified = true;
      req.session.user = {
        id: user._id,
        email: user.email,
        name: `${user.firstName}`,
        role: user.role,
        isVerified: user.isVerified
      };

      res.status(200).json({
        message: "Login successful",
        session: req.session.user,
      });
    }
  } catch (error) {
    console.error("Error in Login", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// logout part
const logout = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      res.status(400).json({
        error: "Internal Server Error",
      });
    }
  });
  res.status(200).json({
    message: "LogOut success",
  });
};

//  dash bord part

const dashbord = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "User is unauthorized" });
  }

  if (req.session.user.role === "admin") {
    return res.status(200).json({
      message: `Welcome to admin dashboard, ${req.session.user.name}`,
    });
  }

  if (req.session.user.role === "user") {
    return res.status(200).json({
      message: `Welcome to user dashboard, ${req.session.user.name}`,
    });
  }
};

const getCurrentUser = (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(200).json({ user: null });
  }
  return res.status(200).json({ user: req.session.user });
};

module.exports = { logInController, dashbord, logout , getCurrentUser};
