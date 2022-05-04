import { FC } from "react"
import { IMAGE_BACKGROUND_HREF } from "../src/constants"


interface WarCatPanelProps {
  children: any;
  width: number,
  height: number,
}

const WarCatPanel =  (props: WarCatPanelProps) => {
  const PAGE_ASPECT_RATIO = props.height / props.width
  const PAGE_WIDTH_VW = '100vw'
  const PAGE_HEIGHT_VW = `${PAGE_ASPECT_RATIO * 100}vw`
  return <svg width={PAGE_WIDTH_VW} height={PAGE_HEIGHT_VW} viewBox={`0 0 ${props.width} ${props.height}`}>
    <image href={IMAGE_BACKGROUND_HREF} width={props.width} height={props.height}></image>
    {props.children}
  </svg>
}

export default WarCatPanel