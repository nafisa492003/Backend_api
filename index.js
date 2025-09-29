require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const dbconnection = require("./database/dbconnection");
const route = require("./router");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://e-commerce-fdr.netlify.app", 
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "mySessions",
});
app.use(
  session({
    secret: "e-commerce-api",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: store,
  })
);

dbconnection();
app.use(route);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});
