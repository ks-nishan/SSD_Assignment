require('dotenv').config();
const rateLimit = require('express-rate-limit');
const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const app = express();

// Apply rate limiter middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15, // Maximum 3 requests per minute from the same IP
  message: 'Too many requests from this IP, please try again later.',
});

// Apply rate limiter to all routes or specific routes as needed
app.use(limiter);
console.log(limiter.message);

const cors = require("cors");

const patients = require("./P_models/PatientsSchema");


const router = require("./P_routes/router");

const crudRoutes = require("./routes/crudRoutes");

//import routes

const userRoutes = require("./n_routes/n_users");

const programRoutes = require("./n_routes/n_programs");

const medicine = require('./n_routes/m_Medicine');
const delivary = require('./n_routes/m_delivary');

app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

//middleware

app.use(bodyParser.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);

app.use(programRoutes);

app.use(router);

app.use('/medicine', medicine);
app.use('/delivary', delivary);
app.use("/api/cruds", crudRoutes);
const {PORT} =process.env;
const {DB_URL} =process.env;


mongoose

  .connect(DB_URL)

  .then(() => {

    console.log("Database connected successfully!!");

  })

  .catch((err) => console.log("Database connection error", err));


app.listen(PORT, () => {

  console.log(`App is running on ${PORT}`);

});