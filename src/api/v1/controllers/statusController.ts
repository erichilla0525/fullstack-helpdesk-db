import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../models/responseModel";
import statusService from "../services/statusService";

export const getAllStatuses = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const statuses = await statusService.getAllStatuses();
    res
      .status(200)
      .json(successResponse(statuses, "Statuses retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const getStatusById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const status = await statusService.getStatusById(id);

    if (!status) {
      res.status(404).json(errorResponse("Status not found"));
      return;
    }

    res
      .status(200)
      .json(successResponse(status, "Status retrieved successfully"));
  } catch (error) {
    next(error);
  }
};
