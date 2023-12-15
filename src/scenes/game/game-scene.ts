import Phaser from 'phaser';
import Ball from '../../entities/ball';

export default class GameScene extends Phaser.Scene {
  private ball: Ball;

  constructor() {
    super('game-scene');
  }

  preload() {
    this.load.setBaseURL('https://labs.phaser.io');
    this.load.image('sky', 'assets/skies/bigsky.png');
    this.load.image('ball', 'assets/sprites/aqua_ball.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  }

  create() {
    this.add.image(400, 300, 'sky');
    this.addBall();
    this.addEventListeners();
    this.scene.run('ui-scene');
    window.g = this;
  }

  addBall() {
    this.ball = new Ball(this);
  }

  onPointerMove(pointer: Phaser.Input.Pointer): void {
    this.ball.setPosition(pointer.x, pointer.y);
  }

  onPointerUp(pointer: Phaser.Input.Pointer): void {
    this.ball.fire();
  }

  update(time: number, delta: number): void {
    // console.log('this.ball.angle', this.ball.angle);
  }

  addEventListeners() {
    this.input.on(Phaser.Input.Events.POINTER_MOVE, this.onPointerMove, this);
    this.input.on(Phaser.Input.Events.POINTER_UP, this.onPointerUp, this);
  }
}
