import prisma from "../../../../prisma/client";
import { Faq } from "../types/faq";

export const fetchAllFaq = async (): Promise<Faq[]> => {
  const data = await prisma.faq.findMany({});
  return data;
};

export const fetchFaqById = async (id: string): Promise<Faq | null> => {
  const data = await prisma.faq.findFirst({
    where: { id },
  });
  return data;
};
export const createFaq = async (faqData: Faq, userId: string): Promise<Faq> => {
  const data = await prisma.faq.create({
    data: {
      ...faqData,
      userId: userId,
    },
  });
  return data;
};

export const updateFaq = async (id: string, faqData: Faq): Promise<Faq> => {
  const data = await prisma.faq.update({
    where: { id },
    data: { ...faqData },
  });
  return data;
};

export const deleteFaq = async (id: string): Promise<void> => {
  await prisma.faq.delete({
    where: {
      id: id,
    },
  });
};
