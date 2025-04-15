import express from "express";
import config from "config";
import postsRouter from "./controllers/reviews/index.js";
import publicRouter from "./controllers/public/index.js";
import "./utils/dbConnect.js";
import authMiddleware from "./middlewares/auth.js";

const app = express();
const PORT = config.get("PORT");

app.use(express.json());

//make a hello world api

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Hello World!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

app.use("/api/public", publicRouter);
app.use(authMiddleware)
app.use("/api/posts", postsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
