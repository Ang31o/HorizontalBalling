import Phaser from 'phaser';

export default class ButtonContainer extends Phaser.GameObjects.Container {
  public background: Phaser.GameObjects.Image;
  public label: Phaser.GameObjects.Text;
  public icon: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number, private props: any) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.addBackground();
    this.addLabel();
    this.makeInteractive();
    this.addEventListeners();
  }

  addBackground(): void {
    this.background = this.scene.add.image(
      0,
      0,
      this.props.image.texture,
      this.props.image.frame
    );
    this.add(this.background);
    this.setSize(this.background.width, this.background.height);
  }

  addLabel(): void {
    if (this.props.label) {
      this.label = this.scene.add.text(0, 0, this.props.label).setOrigin(0.5);
      this.add(this.label);
    }
  }

  addIcon(): void {
    if (this.props.icon) {
      this.icon = this.scene.add.image(
        this.props.icon.x | 0,
        this.props.icon.y | 0,
        this.props.icon.texture,
        this.props.icon.frame
      );
      this.add(this.icon);
    }
  }

  makeInteractive(): void {
    this.setInteractive(
      new Phaser.Geom.Rectangle(
        0,
        0,
        this.background.width,
        this.background.height
      ),
      Phaser.Geom.Rectangle.Contains
    );
    this.input.cursor = 'pointer';
  }

  onPointerUp(): void {
    if (this.props.onRelease) {
      this.props.onReleaseScope
        ? this.props.onRelease.call(this.props.onReleaseScope)
        : this.props.onRelease();
    }
  }

  addEventListeners(): void {
    this.makeInteractive();
    this.on(Phaser.Input.Events.POINTER_UP, this.onPointerUp, this);
  }

  destroy(fromScene: boolean): void {
    this.props.onRelease &&
      this.off(Phaser.Input.Events.POINTER_UP, this.onPointerUp, this);
    super.destroy(fromScene);
  }
}
