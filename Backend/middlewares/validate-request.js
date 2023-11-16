// validate request body
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = error.details.map((i) => i.message);
      return res.status(400).send(message);
    }
    next();
  };
};

module.exports = { validateRequest };
