const crypto = require("crypto");
const userSchema = require("../models/userSchema");
const emailVaraification = require("../helpers/emailVarification");
const otpController = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!email) {
      return res.json({ error: "email is requred" });
    }

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User is not found." });
    }
    if (user.isVerified) {
      return res.json({ message: "User is verified." });
    }
    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.json({ error: "Invalid OTP" });
    }
    (user.isVerified = true),
      (user.otp = undefined),
      (user.otpExpiry = undefined),
      await user.save();
    res
      .status(200)
      .json({ message: "Email verification is successfully done." });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const resendOtpController = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.json({ error: "email is requred" });
    }
    const user = await userSchema.findOne({ email });
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    user.otp = otp,
    user.otpExpiry = otpExpiry,
    emailVaraification(email , otp)
    await user.save()
    res
    .status(200)
    .json({ message: "resend OTP successfully done." });
  } catch (error) {
    console.error("Error in sending otp", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { otpController, resendOtpController };
