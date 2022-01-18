const epayco = require('epayco-sdk-node')({
  apiKey: process.env.EPAYCO_PUBLIC_KEY,
  privateKey: process.env.EPAYCO_PRIVATE_KEY,
  lang: 'ES',
  test: true,
});

async function createCardToken(creditCardInfo) {
  return await epayco.token.create(creditCardInfo);
}

async function createUser(userInfo) {
  return epayco.customers.create(userInfo);
}

async function makePayment(paymentInfo) {
  return await epayco.charge.create(paymentInfo);
}

module.exports = {
  createCardToken,
  createUser,
  makePayment,
};
