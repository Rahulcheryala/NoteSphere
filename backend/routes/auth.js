const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  [
    body("name")
      .not()
      .isEmpty()
      .isLength({ min: 5 })
      .withMessage("Name must have more than 5 characters"),
    body("email")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Please enter a valid email address"),
    body("password")
      .not()
      .isEmpty()
      .isLength({ min: 5 })
      .withMessage("Password should atleast have 5 characters"),
  ],
  (req, res) => {
    // console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, proceed with saving user
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => {
        // Send response once user is created
        console.log("User inserted");
        res.json(user);
      })
      .catch((err) => {
        // Handle any errors that occur during user creation
        if (err.code == 11000) {
          // Handles duplicate values of email
          console.log(`Error message: ${err.message}`);
          res.status(400).send("User already exists with this email");
        } else {
          console.log(err.message, err.code);
          res.status(500).send("Server ERROR !!!");
        }
      });
  }
);

module.exports = router;
