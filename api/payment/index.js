const { Router } = require('express');

const {
  createCardTokenHandlers,
  createCustomerHandlers,
  makePaymentHandlers,
} = require('./payment.controller');
const { isAuthenticated } = require('../../auth/auth.service');

const router = Router();

router.post('/card-token', isAuthenticated(), createCardTokenHandlers);
router.post('/create-customer', isAuthenticated(), createCustomerHandlers);
router.post('/make-payment', isAuthenticated(), makePaymentHandlers);

module.exports = router;
