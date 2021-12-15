const { createUser, getUserById, findOneUser } = require('./user.service');
const { signToken } = require('../../auth/auth.service');

async function createUserHandler(req, res) {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getUserByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function loginUserHandler(req, res) {
  const { email, password } = req.body;
  try {
    const user = await findOneUser({ email });

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }

    const token = signToken(user.profile);

    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  createUserHandler,
  getUserByIdHandler,
  loginUserHandler,
};
