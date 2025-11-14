import Joi from "joi";
import { requiredString } from "./validationHelper";

export const faqSchema = Joi.object({
  id: Joi.string().optional(),
  question: requiredString("Question"),
  answer: requiredString("Answer"),
}).options({ allowUnknown: true });
