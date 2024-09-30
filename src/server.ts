import errorHandler from "@/middleware/error-handler";
import { limitPayloadSize } from "@/middleware/load-size";
import { logger, middleware } from "@/middleware/logger";
import rateLimit from "@/middleware/rate-limit";
import routes from "@/routes";
import compression from "compression";
import cors from "cors";
import express, { type Application } from "express";
import helmet from "helmet";

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json({ limit: "1mb" }));

app.use(limitPayloadSize);

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to compress responses
app.use(compression());

// Middelware CORS
app.use(cors());
app.options("*", cors());

// Middleware security
app.use(helmet());
app.disable("x-powered-by");

// Middleware rate limit
app.use(rateLimit);

// Middleware request logger
app.use(middleware);

// config routes
app.use("/api", routes);

// Error handlers
app.use(errorHandler);

export { app, logger };
