import { PrismaClient, Ticket } from "@prisma/client";

let prisma = new PrismaClient();

export const fetchAllTickets = async(): Promise<Ticket[]> => {
    return await prisma.ticket.findMany();
}

export const fetchTicketsById = async(id:string): Promise<Ticket | null> => {
    try {
        const ticket = await prisma.ticket.findUnique({
            where: {id},
        });
        return ticket
    } catch(error) {
        throw error;
    }
};

export const deleteTicket = async(id:string): Promise<Ticket | null> => {
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
}): Promise<Ticket> => {
    const newTicket: Ticket = await prisma.ticket.create({
        data: {
            ...ticketData
        },
    });
    return newTicket
};