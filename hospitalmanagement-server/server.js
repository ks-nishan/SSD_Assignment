const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const app = express();

const cookieParser = require("cookie-parser");
const csrf = require("csurf"); // You can use the csurf middleware for generating and verifying CSRF tokens

const cors = require("cors");

const patients = require("./P_models/PatientsSchema");

const router = require("./P_routes/router");

const crudRoutes = require("./routes/crudRoutes");

//import routes

const userRoutes = require("./n_routes/n_users");

const programRoutes = require("./n_routes/n_programs");

const medicine = require("./n_routes/m_Medicine");
const delivary = require("./n_routes/m_delivary");

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
app.use(cookieParser());
app.use(router);

app.use("/medicine", medicine);
app.use("/delivary", delivary);
app.use("/api/cruds", crudRoutes);

// Middleware for CSRF protection
const csrfProtection = csrf({ cookie: true });

// Route to generate and send a CSRF token
app.get("/api/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Your other routes and middleware go here

const PORT = 8000;

const DB_URL =
  "mongodb+srv://nishan:nisha123@cluster1.trfvymb.mongodb.net/SPM_DB?retryWrites=true&w=majority";

mongoose

  .connect(DB_URL)

  .then(() => {
    console.log("Database connected successfully!!");
  })

  .catch((err) => console.log("Database connection error", err));

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
