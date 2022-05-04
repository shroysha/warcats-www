import { Control, Image } from 'babylonjs-gui';
import { GAME_HEIGHT, GAME_WIDTH, GAME_WORLD_SCALE } from '../../constants';

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}


export default class ImageWithRect extends Image {


  static transformWorldSizeToGui(size: number) {
    return size * GAME_WORLD_SCALE + "px"
  }

  worldX: number;
  worldY: number;
  worldWidth: number;
  worldHeight: number;

  constructor(url: string, x: number, y: number, width: number, height: number) {
    super("warcat", url)
    this.worldX = x
    this.worldY = y
    this.worldWidth = width
    this.worldHeight = height

    this.width = ImageWithRect.transformWorldSizeToGui(width)
    this.height =  ImageWithRect.transformWorldSizeToGui(height)

    this.resolveTopLeft()
  }

  getRect(): Rect {
    let top = typeof this.top == "string" ? parseInt(this.top) : this.top
    let left = typeof this.left == "string" ? parseInt(this.left) : this.left
    let width = typeof this.width == "string" ? parseInt(this.width) : this.width
    let height = typeof this.height == "string" ? parseInt(this.height) : this.height
    
    let x = left - width / 2.0
    let y = top - height / 2.0

    return {x, y, width, height}
  }

  doesOverlap(other: ImageWithRect) {
    let r1 = this.getRect()
    let r2 = other.getRect()
	  return !(r1.x + r1.width <= r2.x || r1.y + r1.height <= r2.y || r1.x >= r2.x + r2.width || r1.y >= r2.y + r2.height);	
  }

  move(tick: number) {
    this.worldX += tick
    this.resolveTopLeft()
  }

  jump(y: number) {
    this.worldY = y
    this.resolveTopLeft()
  }

  resolveTopLeft() {
    let rect = this.getRect()

    this.left = ((this.worldX * GAME_WORLD_SCALE) - (GAME_WIDTH / 2.0) + (rect.width / 2.0)) + "px"
    this.top = -((this.worldY * GAME_WORLD_SCALE) - (GAME_HEIGHT / 2.0) + (rect.height / 2.0)) + "px"
  }

}