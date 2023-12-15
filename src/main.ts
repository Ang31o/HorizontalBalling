import Phaser from 'phaser';

import GameScene from './scenes/game/game-scene';
import UiScene from './scenes/ui/ui-scene';
import { Constants } from './constants';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: Constants.gameWidth,
    height: Constants.gameHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
  scene: [GameScene, UiScene],
};

export default new Phaser.Game(config);
