import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { useExpressServer } from "routing-controllers";
import corsOptions from "./config/cors";
import errorHandler from "./api/v1/middleware/errorHandler";
import setupSwagger from "./config/swagger";
import { FaqController } from "./api/v1/controllers/faqController";
import { getAlltickets, getticketById, createticket, deleteTicket } from "./api/v1/controllers/ticketController";
import { ticketValidation } from "./api/v1/validations/ticketValidation";
import statusRoutes from "./api/v1/routes/statusRoutes";

const app: Express = express();

dotenv.config();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Swagger
setupSwagger(app);

// Routing controllers for FAQ
useExpressServer(app, {
  routePrefix: "/api",
  controllers: [FaqController],
  defaultErrorHandler: false,
});

// Root route
app.get("/", (req, res) => {
  res.send("Server is running.");
});

// Ticket routes (from dev branch)
app.get("/api/tickets", getAlltickets);
app.get("/api/tickets/:id", getticketById);
app.post("/api/tickets", ticketValidation, createticket);
app.delete("/api/tickets/:id", deleteTicket);

// Status routes (YOUR code)
app.use("/api/v1/statuses", statusRoutes);

// Error handler
app.use(errorHandler);

export default app;