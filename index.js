import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/user.route.js";
const server = express();
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(router);
server.listen(3000, () => {
  console.log("server is running");
});
