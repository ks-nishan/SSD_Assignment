require('dotenv').config();

const express = require("express");
const https = require("https")
const path = require("path")
const fs = require("fs")

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const app = express();

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


//  app.listen(PORT, () => {

//    console.log(`App is running on ${PORT}`);

//  });

 const sslServer = https.createServer({
   key:fs.readFileSync(path.join(__dirname,'cert','key.pem')),
   cert:fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
 }, app)
sslServer.listen(PORT,() => console.log('Secure server on port 8000'))