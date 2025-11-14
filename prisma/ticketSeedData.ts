import { Ticket } from "@prisma/client"

export const ticketSeedData: Omit<Ticket, "id">[] = [
    {
        content: "Payment method",
        priority: "High",  
        status: "Open",   
    },
    {
        content: "Unable to edit account info",
        priority: "Low",  
        status: "Pending",   
    },
    {
        content: "Login fails",
        priority: "Medium",  
        status: "Closed",   
    },
]