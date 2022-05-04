

import { Camera, PointerInfo, Scene, Vector3 } from 'babylonjs';
import { AdvancedDynamicTexture, Button, Image } from 'babylonjs-gui';
import { DT, FRAME_INTERVAL, GAME_HEIGHT, GAME_WIDTH, GAME_WORLD_WIDTH, GRAVITY, OBSTACLE_TICK, WAD_TICK, WAR_CAT_JUMP_VIY, WAR_CAT_MIN_Y } from '../constants';
import Background from './helpers/Background';
import Obstacle from './helpers/Obstacle';
import Wad from './helpers/Wad';
import WarCat from './helpers/WarCat';


class WarCatClickGame {

  ui: AdvancedDynamicTexture;
  warCat: WarCat;
  wadz: Wad[] = [];
  obstacles: Obstacle[] = [];
  vy = 0;
  isJumping = false;
  lastTick: Date | undefined;
  startJump: Date | undefined;
  backgrounds: Background[] = [];


  constructor(ui: AdvancedDynamicTexture) {
    this.ui = ui

    this.warCat = new WarCat()

    this.wadz.push(new Wad())
    this.obstacles.push(new Obstacle())

    this.backgrounds.push(new Background())


    for(let gameEntity of [this.warCat].concat(this.wadz).concat(this.obstacles).concat(this.backgrounds)) {
      this.ui.addControl(gameEntity)
    }

  }



  tick() {
    this.doMoveEnemies()
    this.doJump()
    this.doBackgroundLogic()
    this.doSpawnNewEnemies()
  }

  doSpawnNewEnemies() {
    let random = Math.random()

    if(random <= 0.01) {
      this.spawnNewWad()
    }

    if(random >= 0.99) {
      this.spawnNewObstacle()
    }
  }

  spawnNewWad() {
    const OVERLAP_DISTANCE = 5

    const randomSpawnX = GAME_WORLD_WIDTH + Math.random() * GAME_WORLD_WIDTH

    let doesOverlap = false
    for(let wad of this.wadz) {
      if(randomSpawnX - OVERLAP_DISTANCE / 2.0  < wad.worldX && randomSpawnX + OVERLAP_DISTANCE / 2.0 > wad.worldX) {
        doesOverlap = true
      }
    }

    if(!doesOverlap) {
        let newWad = new Wad()
        newWad.worldX = randomSpawnX
        newWad.resolveTopLeft()
        console.log("spawning new wad", randomSpawnX)
        this.ui.addControl(newWad)
        this.wadz.push(newWad)
    }

  }

  spawnNewObstacle() {
    const OVERLAP_DISTANCE = 5

    const randomSpawnX = GAME_WORLD_WIDTH + Math.random() * GAME_WORLD_WIDTH

    let doesOverlap = false
    for(let obstacle of this.obstacles) {
      if(randomSpawnX - OVERLAP_DISTANCE / 2.0  < obstacle.worldX && randomSpawnX + OVERLAP_DISTANCE / 2.0 > obstacle.worldX) {
        doesOverlap = true
      }
    }

    if(!doesOverlap) {
        let newObstacle = new Obstacle()
        newObstacle.worldX = randomSpawnX
        newObstacle.resolveTopLeft()
        console.log("spawning newObstacle", randomSpawnX)
        this.ui.addControl(newObstacle)
        this.wadz.push(newObstacle)
    }
  }

  doBackgroundLogic() {
    for(let background of this.backgrounds) {
      background.move(-WAD_TICK)
    }

    let maxBackgroundX = -GAME_WORLD_WIDTH
    let maxBackground = undefined
    for(let background of this.backgrounds) {
      if(background.worldX > maxBackgroundX) {
        maxBackground = background
        maxBackgroundX = background.worldX
      }
    }


    if(maxBackgroundX <= 1) {
      let newBackground = new Background()
      this.backgrounds.push(newBackground)
      newBackground.move(GAME_WORLD_WIDTH + maxBackgroundX)
      this.ui.addControl(newBackground)
    }
  }

  doMoveEnemies() {
    for(let wad of this.wadz) {
      wad.move(-WAD_TICK)   
    }

    for(let obstacle of this.obstacles) {
      obstacle.move(-OBSTACLE_TICK)
    }
  }

  doJump() {
    if(this.startJump != undefined) {
      let now = new Date()
      let dt = (now.getTime() - this.startJump.getTime()) / 1000.0

      let y = WAR_CAT_MIN_Y + WAR_CAT_JUMP_VIY * dt + GRAVITY * dt * dt

      this.warCat.jump(y)
      
      if(this.warCat.worldY <  WAR_CAT_MIN_Y) {
        console.log("stopping jump", this.warCat.top)
        this.warCat.jump(WAR_CAT_MIN_Y)
        this.startJump = undefined
      }
    }
  }

  doStartJump() {
    if(this.startJump == undefined) {
      this.startJump = new Date()
    }
  }


  isGameOver() {
    for(let enemy of this.wadz.concat(this.obstacles)) {
      if(this.warCat.doesOverlap(enemy)) {
        return true;
      }
    }
    return false;
  }

  clearAll() {
    for(let control of [this.warCat].concat(this.wadz).concat(this.obstacles)) {
      this.ui.removeControl(control)
    }
  }
}



class WarCatClickGameController {

  static INSTANCE: WarCatClickGameController;

  ui: AdvancedDynamicTexture;
  scene: Scene;

  static initGame(scene: Scene) {
    WarCatClickGameController.INSTANCE = new WarCatClickGameController(scene)
    WarCatClickGameController.INSTANCE.loadInitUi()
  }

  constructor(scene: Scene) {
    this.scene = scene
    new Camera("main", Vector3.Zero(), scene)
    this.ui = AdvancedDynamicTexture.CreateFullscreenUI("myUI");  
    // this.ui.idealWidth = GAME_WIDTH / 5
    // this.ui.idealHeight = GAME_HEIGHT / 5
    // this.ui.renderAtIdealSize = true
  }

  loadInitUi() {
    let playButton = Button.CreateSimpleButton("but", "Play");
    playButton.onPointerClickObservable.add(() => {
      this.ui.removeControl(playButton)
      this.startGame()
    })

    this.ui.addControl(playButton)
  }

  startGame() {
    let warcatGame = new WarCatClickGame(this.ui)

    let observable = this.scene.onPointerObservable.add((pointerInfo) => {
      switch (pointerInfo.type) {
        case BABYLON.PointerEventTypes.POINTERDOWN:
          warcatGame.doStartJump()
          break;
      }
    });


    let gameInterval = setInterval(() => {
      warcatGame.tick()

      if(warcatGame.isGameOver()) {
        warcatGame.clearAll()
        this.loadInitUi()
        clearInterval(gameInterval)
        this.scene.onPointerObservable.remove(observable)
      }
    }, FRAME_INTERVAL)


  }


}



export default WarCatClickGameController