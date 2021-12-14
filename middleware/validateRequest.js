const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate({
    body: req.body,
    query: req.query,
    params: req.params,
  });
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');

    console.log('error', message);
    res.status(422).json({
      error: message,
    });
  }
};

// const validate = (schema, property) => {
//   return (req, res, next) => {
//     const { error } = schema.validate(req[property], schema);
//     const valid = error == null;
//     if (valid) {
//       next();
//     } else {
//       const { details } = error;
//       const message = details.map((i) => i.message).join(',');
//       console.log('error', message);
//       res.status(422).json({ error: message });
//     }
//   };
// };

module.exports = validate;
