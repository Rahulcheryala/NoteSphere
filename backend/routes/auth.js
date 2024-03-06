const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middlewares/fetchUser");

const JWT_SECRET_SIGNATURE = "$NoteSphere$by$Rahul$";

// Create a User using: POST "/api/auth/Register". No login required
router.post(
  "/Register",
  [
    // Validation checks for the input fields
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
  async (req, res) => {
    // Storing the errors occurred in validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If errors occurred, send them in response msg
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        // Handles duplicate values of email without using email as an index
        return res.status(400).send("User already exists with this email");
      }

      // PASSWORD ENCRYPTION
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;

      // If validation passes, and is a new user, proceed with creating user in users collection in DB
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
        .then((user) => {
          // Send response once user is created
          console.log("User inserted successfully");
          const data = {
            user: {
              id: user.id,
            },
          };
          // creating a token for the user with the jwt sign
          const token = jwt.sign(data, JWT_SECRET_SIGNATURE, {
            expiresIn: "1h",
          });
          res.json({ token: token });
        })
        .catch((error) => {
          // Handle any errors that occur during user creation and insertion into DB
          console.error(error.message, error.code);
          res.status(500).send("Server ERROR !!!");
        });
    } catch (error) {
      // Handles errors while fetching the details from the DB
      console.log(error.message);
      res.status(500).send("Internal Server Error !!!");
    }
  }
);

// Authenticate a User using: POST "/api/auth/Login". No Login required
router.post(
  "/Login",
  [
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
  async (req, res) => {
    // If there are any errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // Check if user exists in the database
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Incorrect username or password. Please try again." });
      }

      // If user exists then compare the password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        // If password doesn't match then send response as a bad request
        return res
          .status(400)
          .json({ error: "Incorrect username or password. Please try again." });
      }

      // If login successful, assign a token for the user
      const data = {
        user: {
          id: user.id,
        },
      };
      // creating a token for the user with the jwt sign
      const token = jwt.sign(data, JWT_SECRET_SIGNATURE, {
        expiresIn: "1h",
      });
      res.json({ token: token });
    } catch (error) {
      // Handle any errors that occur during user creation and insertion into DB
      console.log("error");
      console.error(error.message, error.code);
      res.status(500).send("Server ERROR !!!");
    }
  }
);

// Get details of a logged in User using: POST "/api/auth/getUser". Login required
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    // Handle any errors that occur during user creation and insertion into DB
    console.log("error");
    console.error(error.message, error.code);
    res.status(500).send("Server ERROR !!!");
  }
});

module.exports = router;
