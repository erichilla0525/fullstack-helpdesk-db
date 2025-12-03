import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import { errorResponse, successResponse } from "../models/responseModel";
import { validateRequest } from "../middleware/validate";
import { faqSchema } from "../validations/faqValidation";
import * as FaqService from "../services/faqService";
import { getAuth } from "@clerk/express";
export const getAllFaq = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await FaqService.fetchAllFaq();
    res.status(200).json(successResponse(data, "Faq fetched successfully"));
  } catch (error) {
    next(error);
  }
};

export const createFaq = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const auth = getAuth(req);
    const newFaq = await FaqService.createFaq(req.body, auth.userId!);
    res.status(201).json(successResponse(newFaq, "Faq created succesfully"));
  } catch (error) {
    next(error);
  }
};
export const updateFaq = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const faqExists = await FaqService.fetchFaqById(req.params.id);
    const auth = getAuth(req);
    if (faqExists?.userId !== auth.userId) {
      res
        .status(403)
        .json(errorResponse("You are not authorized to update this FAQ."));
    }
    const updatedFaq = await FaqService.updateFaq(req.params.id, req.body);
    res
      .status(201)
      .json(successResponse(updatedFaq, "Faq updated succesfully"));
  } catch (error) {
    next(error);
  }
};

export const deleteFaq = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const faqExists = await FaqService.fetchFaqById(req.params.id);
    const auth = getAuth(req);
    if (faqExists?.userId !== auth.userId) {
      res
        .status(403)
        .json(errorResponse("You are not authorized to update this FAQ."));
    }
    await FaqService.deleteFaq(req.params.id);
    res.status(200).json(successResponse(null, "Faq deleted succesfully"));
  } catch (error) {
    next(error);
  }
};
