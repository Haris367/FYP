const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().min(3).max(15).required(),
  password: Joi.string().min(8).max(20).required(),
});

module.exports = {
  userSchema,
};
