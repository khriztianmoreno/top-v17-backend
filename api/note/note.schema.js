const Joi = require('joi');
const joiObjectId = require('joi-objectid');

Joi.objectId = joiObjectId(Joi);

const PayloadSchema = Joi.object().keys({
  body: Joi.object().keys({
    content: Joi.string().min(3).max(30).required(),
    important: Joi.boolean().required(),
  }),
});

const ParamsSchema = Joi.object().keys({
  params: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
});

const NoteSchema = Joi.object().keys({
  body: PayloadSchema,
  params: ParamsSchema,
});

module.exports = {
  PayloadSchema,
  ParamsSchema,
};
