import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/user.route.js"; // adjust if needed

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

export default app; // 👈 export the Express app
