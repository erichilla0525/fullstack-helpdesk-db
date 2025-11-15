import express from "express";
import cors from "cors";
import errorHandler from "./api/v1/middleware/errorHandler";
import { getAlltickets, getticketById, createticket, deleteTicket } from "./api/v1/controllers/ticketController";
import { ticketValidation } from "./api/v1/validations/ticketValidation";
import setupSwagger from "../src/config/swagger"
import morgan from "morgan";
import dotenv from "dotenv";
import corsOptions from "./config/cors";
import { useExpressServer } from "routing-controllers";
import { FaqController } from "./api/v1/controllers/faqController";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// setup the controllers and use the /api/v1 prefix for the routes
useExpressServer(app, {
  routePrefix: "/api",
  controllers: [FaqController],
  defaultErrorHandler: false,
});

dotenv.config();

setupSwagger(app)

app.get("/", (req, res) => {
    res.send("Server is running.")
});

app.get("/api/tickets", getAlltickets);
app.get("/api/tickets/:id", getticketById);
app.post("/api/tickets", ticketValidation, createticket);
app.delete("/api/tickets/:id", deleteTicket);
app.use(errorHandler);

export default app;

