import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import EmployeeRouter from "./routes/employee.routes.js";
import UserRouter from "./routes/user.routes.js";
import swaggerDocs from "./swagger.js";

// Initialize environment variables
dotenv.config();

// Create Express app
const app = express();

// Set the port from environment variables or default to 8000
const port = process.env.PORT || 5000;

// Configure CORS to allow all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Enable parsing of JSON requests
app.use(express.json());

// Health check endpoint
app.get("/healthcheck", (req, res) => {
  res.send("The app is running fine");
});

// Define API routes
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/employees", EmployeeRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  swaggerDocs(app, port);
});
