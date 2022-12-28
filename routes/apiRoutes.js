const router = require("express").Router();
const saveData = require("../db/saveData");

// Retrieve notes
router.get("/notes", function (req, res) {
  saveData
    .retrieveNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});

// Add notes
router.post("/notes", (req, res) => {
  saveData
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

// Delete notes
router.delete("/notes/:id", function (req, res) {
  saveData
    .deleteNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;