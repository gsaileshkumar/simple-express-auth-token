import express from "express";
import { authenticateToken } from "./token";

export const aboutRouter = express.Router();

aboutRouter.get("/about", authenticateToken, (req, res) => {
  res.send("Hello World");
});
