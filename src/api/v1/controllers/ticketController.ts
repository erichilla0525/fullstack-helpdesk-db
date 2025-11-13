import { Request, Response, NextFunction } from "express";
import { successResponse } from "../models/responseModel";

import * as ticketService from "../services/ticketService"
import { Ticket } from "@prisma/client";

export const getAlltickets = async(
    req:Request,
    res:Response,
    next:NextFunction
): Promise<void> => {
    try {
        const tickets = await ticketService.fetchAllTickets();
        res.status(200).json(successResponse(tickets, "tickets retrieved"));
    } catch (error) {
        next(error);
    }
};

export const getticketById = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const ticket: Ticket | null = await ticketService.fetchTicketsById(req.params.id);

        if(ticket) {
            res.json(successResponse(ticket, "ticket retrieved successfully"));
        } else {
            const error = new Error(`ticket with ID ${req.params.id} not found`);
            (error as any).statusCode = 404;
            throw error
        }
    } catch (error) {
        next(error);
    }
};

export const createticket = async(
    req:Request,
    res:Response,
    next:NextFunction
): Promise<void> => {
    try {
        const newticket = await ticketService.createTicket(req.body)
        res.status(201)
            .json(successResponse("ticket created successfully."))
    } catch(error) {
        next(error);
    }
};

export const deleteTicket = async(
    req:Request,
    res:Response,
    next:NextFunction
): Promise<void> => {
    try {
        const deletedTicket = await ticketService.deleteTicket(req.params.id)

        if (deletedTicket) {
            res.status(200)
               .json(successResponse("ticket deleted successfully."))
        } else {
            const error = new Error(`ticket with ID ${req.params.id} not found`);
            (error as any).statusCode = 404;
            throw error
        }
    } catch(error) {
        next(error);
    }
}

