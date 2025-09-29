const express = require('express');
const route = express.Router()
const apiroute = require("./api")
const baseUrl = process.env.BASE_URL
route.use(baseUrl , apiroute)
module.exports = route