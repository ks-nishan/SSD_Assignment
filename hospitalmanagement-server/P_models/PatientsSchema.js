const mongoose = require("mongoose");

const patientsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
    maxLength: 10,
  },
  gender: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  rdate: {
    type: Date,
  },
});

const patients = new mongoose.model("patients", patientsSchema);

module.exports = patients;
