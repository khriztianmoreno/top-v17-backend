const Joi = require('joi');
// const joiObjectId = require('joi-objectid');

// Joi.objectId = joiObjectId(Joi);

const PayloadSchema = Joi.object().keys({
  content: Joi.string().min(3).max(30).required(),
  important: Joi.boolean().required(),
});

const ParamsSchema = Joi.object().keys({
  // id: Joi.objectId().required(),
});

module.exports = {
  PayloadSchema,
  ParamsSchema,
};
