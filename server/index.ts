import "@geckos.io/phaser-on-nodejs";

import { app, io, server } from "./core/server";

import { Constants } from "../shared/constants";
import { Game } from "./core/game";
import express from "express";
import path from "path";

function main() {
  new Game();

  app.use("/", express.static(path.join(__dirname, "../dist")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
  });

  server.listen(Constants.PORT);

  server.on("upgrade", (request, socket, head) => {
    io.handleUpgrade(request, socket, head, (websocket) => {
      io.emit("connection", websocket, request);
    });
  });

  console.log(`Application running on port ${Constants.PORT}`);
}

main();
