import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const faqData = [
    {
      id: 1,
      question: "How do I reset my password?",
      answer:
        "Click 'Forgot Password' on the login page and follow the on-screen instructions to reset it.",
    },
    {
      id: 2,
      question: "Where can I submit a technical issue?",
      answer:
        "Use the 'Submit a Ticket' form on our Help Desk portal for any technical concerns.",
    },
    {
      id: 3,
      question: "How do I contact support?",
      answer:
        "You can email us at support@techhelpdesk.com or call 1-800-TECH-HELP for immediate assistance.",
    },
    {
      id: 4,
      question: "What are your business hours?",
      answer:
        "Our technical support team is available 24 hours a day, 7 days a week.",
    },
    {
      id: 5,
      question: "What services does Tech Help Desk cover?",
      answer:
        "We assist with software installation, troubleshooting, cybersecurity, and general IT consultancy.",
    },
    {
      id: 6,
      question: "How do I update my account information?",
      answer:
        "Log in to your account dashboard, select 'Profile Settings', and update your details as required.",
    },
    {
      id: 7,
      question: "Is my personal data secure with Tech Help Desk?",
      answer:
        "Yes, all data is encrypted and stored securely in compliance with international privacy regulations.",
    },
    {
      id: 8,
      question: "Can I change my subscription plan?",
      answer:
        "Absolutely. Navigate to 'Billing & Plans' under your account settings to modify your subscription at any time.",
    },
    {
      id: 9,
      question: "Do you offer remote troubleshooting services?",
      answer:
        "Yes, our certified technicians can securely access your system remotely to diagnose and resolve issues.",
    },
    {
      id: 10,
      question: "How can I provide feedback about your services?",
      answer:
        "We value your input. Visit the 'Feedback' section on our website or email feedback@techhelpdesk.com.",
    },
  ];

  console.log("Seeding database with FAQ data...");

  for (const faq of faqData) {
    await prisma.faq.create({
      data: {
        question: faq.question,
        answer: faq.answer,
      },
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
