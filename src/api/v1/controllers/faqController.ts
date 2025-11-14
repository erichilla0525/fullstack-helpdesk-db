import "reflect-metadata";
import { Request, Response } from "express";
import { errorResponse, successResponse } from "../models/responseModel";
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import { validateRequest } from "../middleware/validate";
import { faqSchema } from "../validations/faqValidation";
import * as FaqService from "../services/faqService";
@Controller()
export class FaqController {
  @Get("/faq")
  async getAll(@Req() req: Request, @Res() res: Response) {
    try {
      return await FaqService.fetchAllFaq();
    } catch (error) {
      throw error;
    }
  }

  @Post("/faq/create")
  @UseBefore(validateRequest(faqSchema))
  async createFaq(@Req() req: Request, @Res() res: Response) {
    try {
      const newFaq = await FaqService.createFaq(req.body);
      res.status(201).json(successResponse(newFaq, "Faq created succesfully"));
    } catch (error) {
      throw error;
    }
  }

  @Put("/faq/update/:id")
  @UseBefore(validateRequest(faqSchema))
  async updateFaq(
    @Param("id") id: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const updatedFaq= await FaqService.updateFaq(id, req.body);
      res
        .status(201)
        .json(successResponse(updatedFaq, "Faq updated succesfully"));
    } catch (error) {
      throw error;
    }
  }

  @Delete("/faq/delete/:id")
  async deleteFaq(
    @Param("id") id: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      await FaqService.deleteFaq(id);
      res.status(200).json(successResponse(null, "Faq deleted succesfully"));
    } catch (error) {
      throw error;
    }
  }
}
