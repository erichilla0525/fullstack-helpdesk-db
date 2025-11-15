import Joi, { StringSchema } from "joi";

export const requiredString = (fieldName: string): StringSchema => {
  return Joi.string()
    .required()
    .messages({
      "any.required": `${fieldName} is required`,
      "string.empty": `${fieldName} cannot be empty`,
    });
};
