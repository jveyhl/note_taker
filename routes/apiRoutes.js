const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Retrieve notes
router.get("/notes", (req, res) => {
  // this was fs.readFile(...)
  fs.readFile("./db/db.json", "utf8", (err, file) => {
    if (err) throw err;

    // The parsed notes must be in an array becuase public/assets/js/index.js line 161 uses a foreach loop
    // and this only works on arrays
    const parsedFile = JSON.parse(file);
    return res.send(parsedFile);
  });
});

// Add notes
router.post("/notes", (req, res) => {
  const { title, text } = req.body;

  // Verify that user submitted a title and text
  if (!title || !text) {
    throw new Error("Please provide a title and text for the note");
  }

  // Use UUID package to add unique IDs
  const newNote = { title, text, id: uuidv4() };

  fs.readFile("./db/db.json", "utf8", (err, file) => {
    if (err) throw err;

    // Retrieve and parse current data in db.json and add
    const parsedFile = JSON.parse(file);

    // Add the newNote to the parsed db.json object
    parsedFile.push(newNote);

    // Stringify updated db.json
    const newFile = JSON.stringify(parsedFile);

    // Write the updated note data back to the db.json file
    fs.writeFile("./db/db.json", newFile, "utf8", (err) => {
      if (err) throw err;
      console.log("A new note was added to the file");
    });

    return res.send(JSON.parse(newFile));
  });
});

// Delete notes
router.delete("/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, file) => {
    if (err) throw err;

    const noteId = req.params.id;

    const parsedFile = JSON.parse(file);

    // Create a new array that excludes the note with id that matches noteID
    const filteredFile = parsedFile.filter(elem => elem.id != noteId);

    // Stringify filtered file and write back to db.json
    const newFile = JSON.stringify(filteredFile);

    fs.writeFile("./db/db.json", newFile, "utf8", (err) => {
      if (err) throw err;
      console.log("The note was deleted");
    });

    return res.send(JSON.parse(newFile));
  });
});

module.exports = router;
