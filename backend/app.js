const express = require('express');
const app = express();
const cors = require('cors');
const weatherRoutes = require("./routes/weatherRoutes")

app.use(cors({
    origin: 'http://localhost:5173'
  }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api", weatherRoutes)


module.exports = app;