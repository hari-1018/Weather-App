const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  description: String,
  icon: String,
  sunset: Number,
});

module.exports = mongoose.model("Weather", weatherSchema);
