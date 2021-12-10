const { Router } = require('express');

const {
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  updateNoteHandler,
} = require('./note.controller');

const router = Router();

router.get('/', getAllNotesHandler);
router.post('/', createNoteHandler);
router.get('/:id', getNoteByIdHandler);
router.delete('/:id', updateNoteHandler);
router.patch('/:id', deleteNoteHandler);

module.exports = router;
