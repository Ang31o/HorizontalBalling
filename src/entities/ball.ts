import Phaser from 'phaser';
import { Events } from '../events/events';
import eventService from '../events/event-service';

export default class Ball extends Phaser.GameObjects.Container {
  private ballImage!: Phaser.GameObjects.Image;
  private spinBallTween!: Phaser.Tweens.Tween;

  get ball(): Phaser.GameObjects.Image {
    return this.ballImage;
  }

  constructor(public scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
    this.init();
  }

  init() {
    console.log(1);
    this.addBallImage();
    this.spinBall();
    this.addEventListeners();
  }

  addBallImage() {
    this.ballImage = this.scene.physics.add.image(-30, 30, 'ball');
    (this.ballImage.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    this.add(this.ballImage);
  }

  spinBall() {
    this.spinBallTween = this.scene.tweens.add({
      targets: this,
      repeat: -1,
      rotation: 2 * Math.PI,
      duration: 5000,
    });
  }

  fire() {
    (this.ballImage.body as Phaser.Physics.Arcade.Body).setAllowGravity(true);
    this.destroySpinBallTween();
    this.scene.physics.velocityFromRotation(
      this.angle,
      300,
      this.ballImage.body.velocity
    );
  }

  reset(): void {
    console.log(22);
    this.ballImage.setPosition(-30, 30);
    this.spinBall();
    (this.ballImage.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
  }

  destroySpinBallTween() {
    this.scene.tweens.remove(this.spinBallTween);
  }

  addEventListeners(): void {
    eventService.on(Events.RESET_BALL, this.reset, this);
  }

  destroy(fromScene?: boolean): void {
    eventService.off(Events.RESET_BALL, this.reset, this);
    super.destroy(fromScene);
  }
}
