const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const { readFile, writeFile } = fs.promises;

// Read, Add or Delete Notes
class radNotes {
  // Method to write a note to file
  write(note) {
    return writeFile("../db/db.json", JSON.stringify(note));
  }

  // Method to read notes file
  read() {
    return readFile("../db/db.json", "utf8");
  }

  // Method to return parsed notes in an array
  retrieveNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }

  // Method to add notes
  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("A title and/or text must be provided.");
    }
    // Use UUID package to add unique IDs
    const newNote = { title, text, id: uuidv4() };

    // Retrieve notes, add the new note, update notes
    return this.retrieveNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  // Method to delete notes
  deleteNote(id) {
    return this.retrieveNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new radNotes();
