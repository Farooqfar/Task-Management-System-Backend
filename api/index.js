import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import router from "../routes/user.route.js";

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(process.cwd(), "public")));
app.use("/", router); // your routes

export default app;
