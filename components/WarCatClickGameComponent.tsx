import { Camera, HemisphericLight, MeshBuilder, Scene, Vector3 } from "babylonjs"
import { GAME_HEIGHT, GAME_WIDTH } from "../src/constants"
import WarCatClickGameController from "../src/games/WarCatClickGameController"
import BabylonScene from "./BabylonScene"

const WarCatClickGameComponent =  () => {
  return <foreignObject x="400" y="800" width={GAME_WIDTH} height={GAME_HEIGHT}>
      <BabylonScene onSceneReady={(scene: Scene) => {WarCatClickGameController.initGame(scene)}}/>
  </foreignObject>
}

export default WarCatClickGameComponent