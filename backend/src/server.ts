import express, { Request, Response } from "express";
import cors from "cors";
import { query } from "./db";
import router from "./routes/router";
import error404 from "./middlewares/error404";
import cookieParser from "cookie-parser";
import { pool } from "./db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();

/* parses incoming JSON data from the request body and makes it available in req.body */
app.use(express.json());
/* support url encoded data like submissions */
app.use(express.urlencoded({ extended: true }));
/* only front domain name accepted */
app.use(cors({ origin: "http://localhost:5173" }));
/* go in router to use a controller depending on the route */
app.use(router);

app.use(error404);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
