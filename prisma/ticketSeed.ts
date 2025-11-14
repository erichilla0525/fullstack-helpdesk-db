import { Ticket, PrismaClient } from "@prisma/client";
import { ticketSeedData } from "./ticketSeedData";

const prisma = new PrismaClient();

async function main() {
    await prisma.ticket.deleteMany();

    const createManyEmployees = await prisma.ticket.createManyAndReturn(
        {
            data: ticketSeedData as Omit<Ticket, "id">[] as any,
            skipDuplicates: true
        }
    );
    console.log("Employee created:", createManyEmployees);
};

main().then(
    async() => {
        await prisma.$disconnect()
    }
).catch(async(e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})