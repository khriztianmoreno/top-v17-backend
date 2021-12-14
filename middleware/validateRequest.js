const getProperty = (method) => {
  return {
    GET: 'query',
    POST: 'body',
    PUT: 'body',
    PATCH: 'body',
    DELETE: 'params',
  }[method];
};

const validate = (schema, property) => (req, res, next) => {
  const { value, error } = schema.validate({
    [property]: req[property],
  });

  const valid = error == null;

  if (valid) {
    req[property] = value;
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

module.exports = validate;
