import { World } from "../components/world";

export class Game extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.HEADLESS,
      parent: "phaser-game",
      width: 800,
      height: 600,
      banner: false,
      scene: [World],
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
        },
      },
    });
  }
}
