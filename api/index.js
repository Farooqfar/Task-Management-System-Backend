import app from "../server.js"; // make sure this path is correct
import { createServer } from "http";
import { parse } from "url";

export default function handler(req, res) {
  const parsedUrl = parse(req.url, true);
  req.url = parsedUrl.pathname;
  app(req, res); // pass request to express app
}
