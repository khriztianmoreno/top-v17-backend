const Joi = require('joi');
const joiObjectId = require('joi-objectid');

Joi.objectId = joiObjectId(Joi);

const ParamsSchema = Joi.object({
  id: Joi.objectId().required(),
});

const PayloadSchema = Joi.object().keys({
  content: Joi.string().min(3).max(250).required(),
  important: Joi.boolean(),
});

const NoteSchema = Joi.object().keys({
  body: PayloadSchema,
  params: ParamsSchema,
});

module.exports = { PayloadSchema, ParamsSchema, NoteSchema };
