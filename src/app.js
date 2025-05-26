// for methods of express
import express from "express";
import router from "./routes/routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json({ limit: "30kb" }));

app.use(express.urlencoded({ limit: "30kb", extended: true }));

app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());

app.use("/api/v1/users", router);

export { app };
