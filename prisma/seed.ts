import prisma from "./client";
import { ticketSeedData } from "./ticketSeedData"

async function main() {
  console.log("Starting seed...");

  // Seed Status data
  const statuses = [
    { name: "Open", color: "#3B82F6" },
    { name: "In Progress", color: "#F59E0B" },
    { name: "Resolved", color: "#10B981" },
    { name: "Closed", color: "#6B7280" },
    { name: "On Hold", color: "#EF4444" },
  ];

  for (const status of statuses) {
    await prisma.status.upsert({
      where: { name: status.name },
      update: {},
      create: status,
    });
  }

  console.log("Status seed completed!");

  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: ticketSeedData,
  });
  console.log("Ticket seed completed!");

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
