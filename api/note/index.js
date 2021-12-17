const { Router } = require('express');

const {
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  updateNoteHandler,
  getNoteByUserHandler,
} = require('./note.controller');
const { NoteSchema } = require('./note.schema');

const { isAuthenticated, hasRole } = require('../../auth/auth.service');
const validateRequest = require('../../middleware/validateRequest');

const router = Router();

/**
 * @swagger
 * /notes:
 *  get:
 *     tags:
 *     - notes
 *     description: get all notes
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get('/', getAllNotesHandler);
router.post(
  '/',
  isAuthenticated(),
  validateRequest(NoteSchema, 'body'),
  createNoteHandler,
);
router.get('/:id', validateRequest(NoteSchema, 'params'), getNoteByIdHandler);
router.get('/user/:userId', getNoteByUserHandler);
router.delete('/:id', hasRole(['company', 'viewer']), deleteNoteHandler);
router.patch('/:id', updateNoteHandler);

module.exports = router;
