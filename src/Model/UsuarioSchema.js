import Joi from 'joi';

export const userRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
  });

  export const userLoginSchema = Joi.object({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required()
  });

  export const walletRegisterSchema = Joi.object({
    type: Joi.string().valid("income", "outcome").required(),
    value: Joi.number().precision(2).required(),
    text: Joi.string().required(),
    date: Joi.string().required()
  });