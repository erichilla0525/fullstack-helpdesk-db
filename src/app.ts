import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import corsOptions from "./config/cors";
import errorHandler from "./api/v1/middleware/errorHandler";
import statusRoutes from "./api/v1/routes/statusRoutes";

const app: Express = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/v1/statuses", statusRoutes);

// Error handler
app.use(errorHandler);

export default app;
