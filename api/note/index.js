const { Router } = require('express');

const {
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  updateNoteHandler,
  getNoteByUserHandler,
} = require('./note.controller');
const { PayloadSchema, ParamsSchema } = require('./note.schema');
const validateRequest = require('../../middleware/validateRequest');

const router = Router();

router.get('/', getAllNotesHandler);
router.post('/', validateRequest(PayloadSchema, 'body'), createNoteHandler);
router.get('/:id', validateRequest(ParamsSchema, 'params'), getNoteByIdHandler);
router.get('/user/:userId', getNoteByUserHandler);
router.delete('/:id', updateNoteHandler);
router.patch('/:id', deleteNoteHandler);

module.exports = router;
