import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { errorResponse } from "../models/responseModel";

const statusIdSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const validateStatusId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = statusIdSchema.validate(req.params);

  if (error) {
    res.status(400).json(errorResponse(error.details[0].message));
    return;
  }

  next();
};
