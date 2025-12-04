import Joi from "joi";
import { validateRequest } from "../middleware/validate";

export const ticketSchema = Joi.object({
    id:Joi.string(),
    content: Joi.string().required(),
    priority: Joi.string().valid("Low", "Medium", "High").required(),
    status: Joi.string().insensitive().valid("Open", "Closed", "Pending").required()
})

export const ticketValidation =validateRequest(ticketSchema);
