const express = require("express");

const Programs = require("../n_models/n_programs");

const router = express.Router();
const auth = require("../controllers/auth");
router.post("/program/save",auth, (req, res) => {
  if (req.user.userType !== "Admin") {
    return res.status(403).json({
      error: "Access denied. Only ADMIN users are allowed to save programs.",
    });
  }
  let newProgram = new Programs(req.body);

  newProgram.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json({
      success: "Program saved successfully",
    });
  });
});

//get program
router.get("/programs",auth, (req, res) => {
  // if (req.user.userType !== "Admin") {
  //   return res.status(403).json({
  //     error: "Access denied. Only ADMIN users are allowed to save programs.",
  //   });
  // }
  Programs.find().exec((err, programs) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingPrograms: programs,
    });
  });
  // ggggg
});

//get a single program
router.get("/program/:id", (req, res) => {
  let programId = req.params.id;

  Programs.findById(programId, (err, program) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      program,
    });
  });
});

//update program
router.put("/program/update/:id",auth, (req, res) => {
  if (req.user.userType !== "Admin") {
    return res.status(403).json({
      error: "Access denied. Only ADMIN users are allowed to save programs.",
    });
  }
  Programs.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, program) => {
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
router.delete("/program/delete/:id",auth, (req, res) => {
  if (req.user.userType !== "Admin") {
    return res.status(403).json({
      error: "Access denied. Only ADMIN users are allowed to save programs.",
    });
  }
  Programs.findByIdAndRemove(req.params.id).exec((err, deletedProgram) => {
    if (err)
      return res.status(400).json({
        message: "Deleted Unsuccessful",
        err,
      });
    return res.json({
      message: "Deleted succesfull",
      deletedProgram,
    });
  });
});

module.exports = router;
