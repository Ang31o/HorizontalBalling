import Phaser from 'phaser';
import ButtonContainer from '../../ui/button-container';
import { Constants } from '../../constants';
import eventService from '../../events/event-service';
import { Events } from '../../events/events';

export default class UiScene extends Phaser.Scene {
  resetButton: ButtonContainer;

  constructor() {
    super('ui-scene');
  }

  preload() {
    this.load.setBaseURL('https://labs.phaser.io');
    this.load.image('button', 'assets/sprites/button-bg.png');
    console.log(1);
  }

  create() {
    this.resetButton = new ButtonContainer(
      this,
      Constants.gameWidth / 2,
      Constants.gameHeight / 2 + 200,
      {
        image: {
          texture: 'button',
        },
        label: 'Reset',
        onRelease: () => eventService.emit(Events.RESET_BALL),
      }
    );
    window.u = this;
  }
}
