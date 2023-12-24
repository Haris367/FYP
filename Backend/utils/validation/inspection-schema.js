const Joi = require('joi');

const inspectionRequestSchema = Joi.object({
  modelName: Joi.string().required(),
  IMEI: Joi.number().min(15).max(17).required(),
  date: Joi.date().required(),
  status: Joi.boolean().required()
});

module.exports = inspectionRequestSchema;
