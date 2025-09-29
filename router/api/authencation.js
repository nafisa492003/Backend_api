const express = require("express");
const registretionController = require("../../controllers/registretionController");
const {
  otpController,
  resendOtpController,
} = require("../../controllers/otpController");
const {logInController, dashbord, logout, getCurrentUser} = require("../../controllers/logController");
const Authmiddlewere = require("../../middlewere/AuthMiddlewere");
const RoleMiddlewere = require("../../middlewere/RoleMiddlewere");

const route = express.Router();

route.post("/registration", registretionController);
route.post("/otpValidation", otpController);
route.post("/resendOtp", resendOtpController);
route.post("/login", logInController);
route.post("/logout", logout);
route.get("/me" , getCurrentUser);
route.get("/admmin-dashboard",Authmiddlewere,RoleMiddlewere("admin") , dashbord);
route.get("/user-dashboard",Authmiddlewere,RoleMiddlewere("user") , dashbord);
module.exports = route;
