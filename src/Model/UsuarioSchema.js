import joi from 'joi';

export const userRegisterSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
  });

  export const userLoginSchema = Joi.object({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required()
  });