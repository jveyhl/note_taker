const router = require("express").Router();
const radNotes = require("../helpers/radNotes");

// Retrieve notes
router.get("/notes", function (req, res) {
  radNotes
    .retrieveNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});

// Add notes
router.post("/notes", (req, res) => {
  radNotes
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

// Delete notes
router.delete("/notes/:id", function (req, res) {
  radNotes
    .deleteNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
