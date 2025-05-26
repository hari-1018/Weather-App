const express = require('express');
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/dbconnect');

connectDB();
const PORT = process.env.PORT || 8001;


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
