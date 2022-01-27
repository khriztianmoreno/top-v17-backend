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
 * @openapi
 * /api/notes:
 *  get:
 *    tags:
 *    - Notes
 *    summary: Get all notes
 *    description: Get all notes from the database
 *    responses:
 *      200:
 *       description: Get all notes
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: '#/components/schemas/Note'
 *      500:
 *       description: Server error
 */
router.get('/', getAllNotesHandler);

/***
 * @openapi
 * /api/notes:
 *  post:
 *    tags:
 *    - Notes
 *    summary: Create a new note
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: "object"
 *            properties:
 *              content:
 *                type: string
 *                description: Content of note
 *                example: Generate documentation
 *              important:
 *                type: bool
 *                description: Is important
 *                example: false
 *    responses:
 *      201:
 *        description: Created a new nonte
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                content:
 *                  type: string
 *                  example: Generate documentation
 *                _id:
 *                  type: string
 *                  example: 614a96635701df551c9d2623
 *                important:
 *                  description: Is important
 *                  example: false
 *      400:
 *        description: Bad request
 *      401:
 *        description: Error Unauthorized
 *
 */
router.post(
  '/',
  isAuthenticated(),
  validateRequest(NoteSchema, 'body'),
  createNoteHandler,
);
router.get('/:id', validateRequest(NoteSchema, 'params'), getNoteByIdHandler);
router.get('/user/:userId', getNoteByUserHandler);
router.delete('/:id', hasRole(['company', 'viewer']), deleteNoteHandler);

/**
 * @openapi
 * '/api/notes/{productId}':
 *  patch:
 *     tags:
 *     - Notes
 *     summary: Update a single note by the id
 *     parameters:
 *      - name: productId
 *        in: path
 *        description: The id of the Note
 *        required: true
 *      - name: note
 *        in: body
 *        description: Content of note to update
 *        required: true
 *        schema:
 *         $ref: '#/components/schema/Note'
 *     responses:
 *       200:
 *        description: Updated a note
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                content:
 *                  type: string
 *                  example: Generate documentation
 *                _id:
 *                  type: string
 *                  example: 614a96635701df551c9d2623
 *                important:
 *                  description: Is important
 *                  example: false
 *       404:
 *         description: Note not found
 */
router.patch('/:id', updateNoteHandler);

module.exports = router;
