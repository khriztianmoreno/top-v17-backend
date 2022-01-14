const crypto = require('crypto');

const { createUser, getUserById } = require('./user.service');
const { log } = require('../../utils/logger');
const { sendEmail } = require('../../utils/email');

async function createUserHandler(req, res) {
  const newUser = req.body;
  try {
    const hash = crypto
      .createHash('sha256')
      .update(newUser.email)
      .digest('hex');

    newUser.passwordResetToken = hash;
    newUser.passwordResetExpires = Date.now() + 3600000 * 24; // 24 hour

    const user = await createUser(newUser);

    const email = {
      to: user.email,
      subject: 'Activate your account',
      template_id: 'd-649011f35b854690a0e5f47de11eb2f2',
      dynamic_template_data: {
        firstName: user.firstName,
        lastName: user.lastName,
        url: `http://localhost:3000/activate/${hash}`,
      },
    };

    sendEmail(email);
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
