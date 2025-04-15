import express from "express";
import config from "config";
import path from "path";
import { fileURLToPath } from "url";
import postsRouter from "./controllers/reviews/index.js";
import publicRouter from "./controllers/public/index.js";
import "./utils/dbConnect.js";
import authMiddleware from "./middlewares/auth.js";
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = config.get("PORT");

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);


//make a hello world api

app.get("/saad", (req, res) => {
  try {
    res.status(200).json({ msg: "Hello World!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

app.use("/api/public", publicRouter);
// app.use(authMiddleware)
app.use("/api/posts", authMiddleware, postsRouter);

// Serve static frontend
app.use(express.static(path.join(__dirname, "dist")));

// Wildcard route for React Router (safe version)
app.get(/^\/(?!.*https?:\/\/).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
