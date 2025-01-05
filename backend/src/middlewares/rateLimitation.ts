import rateLimit from "express-rate-limit";

// Requests authorized per windowMs (100 each 10 minutes)
const rateLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOWMS_MINUTES) * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX),
  message: "Too many requests, slow down !",
});

export default rateLimiter;
