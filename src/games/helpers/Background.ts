import ImageWithRect from "./ImageWithRect";


export default class WarCat extends ImageWithRect {
  
  constructor() {
    super("game/images/background.jpeg", 0, 0, 15, 6)
    this.zIndex = -1
  }
}