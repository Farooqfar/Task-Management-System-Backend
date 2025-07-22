import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "../../routes/user.route.js";
import serverless from "serverless-http";
const server = express();
server.use(
  cors({
    origin: "*",
    credentials: true
  })
);
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(router);
const handler = serverless(server);
export { handler as default };
