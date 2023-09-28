// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const Users = require("../n_models/n_users");

const router = express.Router();

const nodemailer = require("nodemailer");

//save User
router.post("/user/save", async (req, res) => {      
  try {
    const { userName, email, phone, password ,userType} = req.body;

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      userName,
      email,
      phone,
      password: hashedPassword, 
      userType// Save the hashed password
    });
// Create token
const token = jwt.sign(
  { user_id: newUser._id, email,userType },
  process.env.TOKEN_KEY,
  {
    expiresIn: "2m",
  }
);
// save user token
newUser.token = token;
 
    newUser.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "nishannisha330@gmail.com",
          pass: "vwrgqcedozekvjnc",
        },
      });

      let details = {
        from: "nishannisha330@gmail.com",
        to: email,
        subject: "Registration Successfull!!!",
        text:
          "Hi " +
          userName +
          ",\n\n" +
          "=====Welcome to Hospital Zone.=====\n" +
          "You are successfully registered to ZONE hospital account.Your informations are below\n" +
          "User Name : " +
          userName +
          "\n" +
          "Email Address : " +
          email +
          "\n" +
          "Mobile No : " +
          phone +
          "\n" +
          "Password : " +
          password +
          "\n\n" +
          "Thank You.\n" +
          "Management",
      };

      mailTransporter.sendMail(details, (err) => {
        if (err) {
          console.log("It has an error", err);
        } else {
          console.log("Email sent successfully");
        }
      });
      return res.status(200).json({
        success: "User created successfully",
      });
    }
  });
}catch (err) {
  console.error(err);
  return res.status(500).json({
    error: "Internal Server Error",
  });
}
});
// mathy----------------------------------------------------------------------------------------
router.post("/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await Users.findOne({ email });
    console.log(user)

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email,userType:user.userType},
        process.env.TOKEN_KEY,
        {
          expiresIn: "2m",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});
// mathy----------------------------------------------------------------------------------------
//get user
router.get("/users", (req, res) => {
  Users.find().exec((err, users) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingUsers: users,
    });
  });
});

//get a single user
router.get("/user/:id", (req, res) => {
  let userId = req.params.id;

  Users.findById(userId, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  });
});

//update user
router.put("/user/update/:id", (req, res) => {
  Users.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      return res.status(200).json({
        success: "Update successfull",
      });
    }
  );
});

//delete user
router.delete("/user/delete/:id", (req, res) => {
  Users.findByIdAndRemove(req.params.id).exec((err, deletedUser) => {
    if (err)
      return res.status(400).json({
        message: "Deleted Unsuccessful",
        err,
      });
    return res.json({
      message: "Deleted succesfull",
      deletedUser,
    });
  });
});

module.exports = router;
