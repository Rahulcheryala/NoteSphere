const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchUser = require("../middlewares/fetchUser");
const { body, validationResult } = require("express-validator");

// Get notes of  the user using GET: "/api/notes/fetchNotes". Login required
router.get("/fetchNotes", fetchUser, async (req, res) => {
  try {
    // Try to get the notes of a user by their ID and display them
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    // Handles errors while fetching the details from the DB
    console.log(error.message);
    res.status(500).send("Internal Server Error !!!");
  }
});

// To add new notes using POST: "/api/notes/addNotes". Login required
router.post(
  "/addNotes",
  fetchUser,
  [
    body("title")
      .not()
      .isEmpty()
      .isLength({ min: 2 })
      .withMessage("Title should atleast have 2 characters"),
    body("description")
      .not()
      .isEmpty()
      .isLength({ min: 5 })
      .withMessage("Description should atleast have 5 characters"),
  ],
  async (req, res) => {
    try {
      // destructuring the requested object
      const { title, description, tag } = req.body;
      // Storing the errors occurred in validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // If errors occurred, send them in response msg
        return res.status(400).json({ errors: errors.array() });
      }

      // Create a new note in the notes collection in DB
      const newNote = await Note.create({
        user: req.user.id,
        title: title,
        description: description,
        tag: tag,
      })
        .then((newNote) => {
          console.log("Note added Successfully");
          res.json(newNote);
        })
        .catch((error) => {
          // Handle any errors that occur during note creation and insertion into DB
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

// Update an existing Note using: PUT "/api/notes/updateNote/note_id". Login required
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Check if the note_id given in the url exists
    let note = await Note.findById(req.params.id); // params.id is the id sent in the url
    if (!note) {
      // If the note is not existing
      return res.status(404).send("Not found!!!");
    }

    // Check if the user id present in the note and person updating that note is same or not
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Action not allowed!!!");
    }

    // Get the note that is to be updated
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ success: "Note Updated successfully", note: note });
  } catch (error) {
    // Handle any errors that occur during user creation and insertion into DB
    console.error(error.message, error.code);
    res.status(500).send("Server ERROR !!!");
  }
});

// Delete an existing note using: DELETE "/api/notes/deleteNote/note_id". Login required
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    // Check if the note_id given in the url exists
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    // Check if the user id present in the note and person deleting that note is same or not
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Action not allowed!!!");
    }

    // fetching the note by its Id and deleting it
    let deletedDocument = await Note.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      // If note does not exist
      console.log("Not found");
      return res.status(404).json({ error: "Not found !!!" });
    }

    return res.json({
      success: "Note deleted successfully",
      deletedDocument: deletedDocument,
    });
  } catch (error) {
    // Handle any errors that occur during fetching the note from the DB
    console.error(error.message, error.code);
    return res.status(500).send("Server ERROR !!!");
  }
});

module.exports = router;
