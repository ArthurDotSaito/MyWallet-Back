import Joi from "joi";

export const walletRegisterSchema = Joi.object({
    type: Joi.string().valid("income", "outcome").required(),
    value: Joi.number().precision(2).required(),
    text: Joi.string().required(),
    date: Joi.string().required()
  });