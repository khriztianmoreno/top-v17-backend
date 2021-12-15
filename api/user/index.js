const { Router } = require('express');

const {
  createUserHandler,
  getUserByIdHandler,
  loginUserHandler,
} = require('./user.controller');

const router = Router();

router.post('/', createUserHandler);
router.get('/:id', getUserByIdHandler);
router.post('/login', loginUserHandler);

module.exports = router;
