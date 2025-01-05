import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes/router";
import error404 from "./middlewares/error404";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import rateLimiter from "./middlewares/rateLimitation";

// Enable environment variables
dotenv.config();

const app = express();

// Use the rateLimiter middleware to limit requests from the same IP
app.use(rateLimiter);
// Enable req.body json payloads when requesting with POST etc
app.use(express.json());
// Enable url encoded data (querystrings) in req.body
app.use(express.urlencoded({ extended: false }));
// Enable cookies (req.cookies)
app.use(cookieParser());
// Only front domain name can make requests to the server, credentials allows cookies and authentication headers to be included in requests from the origin
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// Use the imported router routes
app.use(router);
// If no matching route is found return 404
app.use(error404);
// Launch the server on port 5000
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
