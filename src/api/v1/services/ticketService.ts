import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

export const fetchAllTickets = async() => {
    return await prisma.ticket.findMany();
}

export const fetchTicketsById = async(id:string) => {
    try {
        const ticket = await prisma.ticket.findUnique({
            where: {id},
        });
        return ticket
    } catch(error) {
        throw error;
    }
};

export const deleteTicket = async(id:string) => {
    try {
        const deletedTicket = await prisma.ticket.delete({
            where: {id},
        });
        return deletedTicket
    } catch(error) {
        throw error;
    }
}

export const createTicket = async(ticketData: {
    content: string;
    priority: string;
    status: string;
}) => {
    const newTicket = await prisma.ticket.create({
        data: {
            ...ticketData
        },
    });
    return newTicket
};