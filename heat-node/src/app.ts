import "dotenv/config";
import "express-async-errors";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";

import { router } from "./routes";

const app = express();

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cors());

app.use(router);

app.get("/github", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get("/signin/callback", (req, res) => {
  const { code } = req.query;

  return res.json({ code });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    if (err.message === "Token missing" || err.message === "Token expired.") {
      return res.status(401).json({
        error: err.message,
      });
    }

    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    error: "Internal server error",
  });
});

export { app, serverHttp, io };
