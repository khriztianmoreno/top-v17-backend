const { Router } = require('express');

const {
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  updateNoteHandler,
  getNoteByUserHandler,
} = require('./note.controller');

const { isAuthenticated, hasRole } = require('../../auth/auth.service');

const router = Router();

router.get('/', getAllNotesHandler);
router.post('/', isAuthenticated(), createNoteHandler);
router.get('/:id', getNoteByIdHandler);
router.get('/user/:userId', getNoteByUserHandler);
router.delete('/:id', hasRole(['company', 'viewer']), deleteNoteHandler);
router.patch('/:id', updateNoteHandler);

module.exports = router;
