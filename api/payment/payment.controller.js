const { createCardToken } = require('./payment.service');
const { updateBillingCards } = require('../user/user.service');
const { log } = require('../../utils/logger');

async function createCardTokenHandlers(req, res) {
  const { cardNumber, cardExpYear, cardExpMonth, cardCVC } = req.body;

  const creditInfo = {
    'card[number]': cardNumber,
    'card[exp_year]': cardExpYear,
    'card[exp_month]': cardExpMonth,
    'card[cvc]': cardCVC,
  };

  try {
    const { card, id, status } = await createCardToken(creditInfo);

    const user = req.user;

    const creditCard = {
      expMonth: card.exp_month,
      expYear: card.exp_year,
      name: card.name,
      mask: card.mask,
      tokenId: id,
    };

    await updateBillingCards(user, creditCard);

    res.status(200).json({ card, id, status });
  } catch (error) {
    log.error(error);
    res.status(500).send({
      message: 'Error al crear el token',
      error,
    });
  }
}

async function createCustomerHandlers(req, res) {
  res.status(200).json({});
}

async function makePaymentHandlers(req, res) {
  res.status(200).json({});
}

module.exports = {
  createCardTokenHandlers,
  createCustomerHandlers,
  makePaymentHandlers,
};
