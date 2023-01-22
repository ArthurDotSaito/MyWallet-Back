import Joi from 'joi';

export const userLoginSchema = Joi.object({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required()
  });