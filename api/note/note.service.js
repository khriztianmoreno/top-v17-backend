const Note = require('./note.model');

/**
 * Get all notes
 * @returns all notes
 */
async function getAllNotes() {
  const notes = await Note.find();
  return notes;
}

/**
 * Get note by id
 * @param {string} id Indentifier of the note to be filtered
 * @returns note
 */
async function getNoteById(id) {
  const note = await Note.findById(id);
  return note;
}

/**
 * Create a new note
 * @param {Object} note Note to create
 * @returns Note created
 */
async function createNote(note) {
  const newNote = new Note(note);
  const savedNote = await newNote.save();
  return savedNote;
}

/**
 * Update a note
 * @param {string} id Indentifier of the note to be updated
 * @param {*} note Body of the note to be updated
 * @returns note updated
 */
async function updateNote(id, note) {
  const updatedNote = await Note.findByIdAndUpdate(id, note);
  return updatedNote;
}

/**
 * Delete a note
 * @param {String} id Identifier of the note to be deleted
 * @returns Note deleted
 */
async function deleteNote(id) {
  const deletedNote = await Note.findByIdAndDelete(id);
  return deletedNote;
}

async function getNoteByUser(userId) {
  const notes = await Note.find({ userId });
  return notes;
}

module.exports = {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
  getNoteByUser,
};
