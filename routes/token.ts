import express from "express";
import jwt from "jsonwebtoken";
import { Token } from "../types";
import {
  UNSAFE_accessTokenSecret,
  UNSAFE_refreshTokenSecret,
  UNSAFE_userCredentials,
  accessTokenExpiration,
  refreshTokenExpiration,
} from "../constants";

export const tokenRouter = express.Router();

const generateAccessToken = (username: string): string => {
  return jwt.sign({ username }, UNSAFE_accessTokenSecret, {
    expiresIn: accessTokenExpiration,
  });
};

const generateRefreshToken = (username: string): string => {
  return jwt.sign({ username }, UNSAFE_refreshTokenSecret, {
    expiresIn: refreshTokenExpiration,
  });
};

export const authenticateToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, UNSAFE_accessTokenSecret, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
};

tokenRouter.post("/token", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password match (hard-coded for simplicity)
  if (
    username === UNSAFE_userCredentials.username &&
    password === UNSAFE_userCredentials.password
  ) {
    const accessToken = generateAccessToken(username);
    const refreshToken = generateRefreshToken(username);
    const token: Token = { token: { accessToken, refreshToken } };
    return res.status(200).json(token);
  }

  res.sendStatus(401);
});

tokenRouter.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (refreshToken == null) {
    return res.sendStatus(401);
  }

  jwt.verify(refreshToken, UNSAFE_refreshTokenSecret, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(401);
    }
    const accessToken = generateAccessToken(user.username);
    const token: Token = { token: { accessToken, refreshToken } };
    return res.json(token);
  });
});
