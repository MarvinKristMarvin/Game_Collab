import express, { Request, Response } from "express";
import cors from "cors";
import { query } from "./db";
import router from "./routes/router";

const app = express();

/* parses incoming JSON data from the request body and makes it available in req.body */
app.use(express.json());
/* only front domain name accepted */
app.use(cors({ origin: "http://localhost:5173" }));
/* go in router to use a controller depending on the route */
app.use(router);

/* api routes */
/*app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await query("SELECT * FROM utilisateur");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});*/

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
