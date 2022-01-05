import {
  Player,
  ServerPacket,
  ServerPacketType,
} from "./../../shared/schema/schema";

import Phaser from "phaser";
import { SnapshotInterpolation } from "@geckos.io/snapshot-interpolation";
import WebSocket from "ws";
import { io } from "../core/server";

export class World extends Phaser.Scene {
  snapshotInterpolation: SnapshotInterpolation;

  interval: number = 0;

  clients: { [key: number]: WebSocket } = {};
  players: { [key: number]: Player } = {};

  constructor() {
    super({ key: "World" });
    this.snapshotInterpolation = new SnapshotInterpolation();
  }

  create() {
    io.on("connection", this.handleConnection);
  }

  update() {}

  handleConnection(client: WebSocket) {
    const id = this.interval;

    console.log(`Client ${id} connected.`);

    this.clients[id] = client;

    const packet: ServerPacket = {
      type: ServerPacketType.INITIALIZE,
      data: {
        oneofKind: "id",
        id,
      },
    };

    client.send(ServerPacket.toBinary(packet));

    client.onclose = () => {
      console.log(`Client ${id} disconnected.`);

      delete this.clients[id];
      delete this.players[id];

      const packet: ServerPacket = {
        type: ServerPacketType.PLAYER_DISCONNECTED,
        data: {
          oneofKind: "id",
          id,
        },
      };

      client.send(ServerPacket.toBinary(packet));
    };

    this.interval++;
  }
}
