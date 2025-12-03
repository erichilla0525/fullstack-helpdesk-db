import Joi from "joi";
import { requiredString } from "./validationHelper";
import { validateRequest } from "../middleware/validate";

export const faqSchema = Joi.object({
  id: Joi.string().optional(),
  question: requiredString("Question"),
  answer: requiredString("Answer"),
}).options({ allowUnknown: true });

export const faqValidation = validateRequest(faqSchema);
