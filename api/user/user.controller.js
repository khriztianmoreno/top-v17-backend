const { createUser, getUserById } = require('./user.service');
const { log } = require('../../utils/logger');

async function createUserHandler(req, res) {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user.profile);
  } catch (err) {
    log.error(err);
    res.status(400).json(err);
  }
}

async function getUserByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    res.status(201).json(user);
  } catch (err) {
    log.error(err);
    res.status(400).json(err);
  }
}

module.exports = {
  createUserHandler,
  getUserByIdHandler,
};
