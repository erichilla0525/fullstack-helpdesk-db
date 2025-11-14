import Joi from "joi";
import { validateRequest } from "../middleware/ticketValidate";

export const ticketSchema = Joi.object({
    id:Joi.string(),
    content: Joi.string().required(),
    priority: Joi.string().valid("Low", "Medium", "High").required(),
    status: Joi.string().valid("Open", "Closed").required()
})

export const ticketValidation =validateRequest(ticketSchema);
