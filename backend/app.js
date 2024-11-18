const express = require("express");
const app = express();
const port = 3009;
const mongoose = require("mongoose");
const path = require("path");

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("../frontend/build"));

const Data = require("./models/Contact");
const Data = require("./models/Avis");
const Data = require("./models/ControleParental");
const Data = require("./models/Dashboard");

// Ajout de logs pour la connexion à MongoDB

// mongoose.connect(
//   "mongodb+srv://",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

const db = mongoose.connection;
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
