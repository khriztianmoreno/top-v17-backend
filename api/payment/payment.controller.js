const Payment = require('./payment.model');
const {
  createCardToken,
  createUser,
  makePayment,
} = require('./payment.service');
const {
  addBillingCards,
  addBillingCustomerId,
} = require('../user/user.service');
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

    await addBillingCards(user, creditCard);

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
  const user = req.user;
  const { data } = await createUser(user);

  await addBillingCustomerId(user, data.customerId);
  res.status(200).json(data);
}

async function makePaymentHandlers(req, res) {
  try {
    const { user, body: payment } = req;
    const { data, success } = await makePayment(user, payment);

    if (!success) {
      return res.status(400).json(data);
    }

    await Payment.create({
      userId: user._id,
      refId: data.recibo,
      bill: payment.bill,
      description: payment.description,
      value: payment.value,
      tax: payment?.tax,
      taxBase: payment?.taxBase,
    });

    return res.status(200).json({ success, data });
  } catch (error) {
    log.error(error);
    res.status(500).send({
      message: 'Error realizando el pago',
      error,
    });
  }
}

module.exports = {
  createCardTokenHandlers,
  createCustomerHandlers,
  makePaymentHandlers,
};
