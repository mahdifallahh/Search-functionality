const Joi = require('joi');

const uploadSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  alignment: Joi.string().valid('Landscape', 'Portrait', 'Other').required(),
  resolution: Joi.string().valid('HD', 'FullHD', '4K', '8K', 'Other').required(),
});

module.exports = { uploadSchema };
