import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes/router";
import error404 from "./middlewares/error404";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import rateLimiter from "./middlewares/rateLimitation";
import helmet from "helmet";
import csrf from "csurf";
import path from "path";

// Enable environment variables
dotenv.config();
//dotenv.config({ path: path.join(__dirname, "../../.env") });

const app = express();

// Set secure headers
app.use(
  helmet({
    //! put back in prod after testing
    /*contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://trusted-cdn.com"],
        styleSrc: ["'self'", "https://trusted-cdn.com"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "https://api.yourdomain.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },*/
    /*frameguard: {
      action: "deny", // Prevent clickjacking
    },
    xContentTypeOptions: true,*/
    // Prevent MIME sniffing
  })
);

// Only front domain can make requests to the server, credentials allows cookies and authentication headers to be included in requests from the origin
app.use(
  cors({
    origin: "*", // Allow frontend domain
    credentials: true, // Allow cookies
    /*methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"], // Include headers used in your requests*/
  })
);
// Handle preflight requests explicitly
app.options("*", cors());

//! Block metadata access
/*app.use((req: Request, res: Response, next: NextFunction): void => {
  if (req.url.startsWith("/latest/metadata")) {
    res.status(403).send("Access Denied");
  } else {
    next();
  }
});
app.use((req, res, next) => {
  res.set("X-Content-Type-Options", "nosniff");
  next();
});*/
// Use the rateLimiter middleware to limit requests from the same IP
app.use(rateLimiter);
// Enable req.body json payloads when requesting with POST etc
app.use(express.json());
// Enable url encoded data (querystrings) in req.body
app.use(express.urlencoded({ extended: false }));
// Enable cookies (req.cookies)
app.use(cookieParser());
// Enable CSRF protection
/*const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);
app.get("/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
app.use(
  csrf({
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    },
  })
);*/

// Use the imported router routes
app.use(router);
// If no matching route is found return 404
app.use(error404);
// Launch the server on port 5000
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on url:${PORT}`);
});
