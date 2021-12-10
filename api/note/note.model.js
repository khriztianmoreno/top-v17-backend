const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    important: Boolean,
    date: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Note', NoteSchema);
