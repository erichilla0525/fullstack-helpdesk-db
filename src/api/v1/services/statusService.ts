import prisma from "../../../../prisma/client";

const getAllStatuses = async () => {
  return await prisma.status.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

const getStatusById = async (id: number) => {
  return await prisma.status.findUnique({
    where: { id },
  });
};

export default {
  getAllStatuses,
  getStatusById,
};
