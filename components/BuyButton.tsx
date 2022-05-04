
import styled, { css } from 'styled-components'


const BuyButtonStyled = styled.image<{}>`
  width: 1503;
  height: 216;
  &:hover {
    background-color: #0cbaba;
    background-image: linear-gradient(315deg, #0cbaba 0%, #380036 74%);
    filter: sepia(1000%) hue-rotate(90deg) saturate(500%);
    cursor: pointer;
  }
`;

export interface BuyButtonProps {
  x: number | string;
  y: number | string;
}

export default (props: BuyButtonProps) => {
  return <BuyButtonStyled x={props.x} y={props.y} href="images/mint.svg" onClick={() => {
    window.open("https://app.stargaze.zone/launchpad/stars1z4gdx0vgsks4cz62tvergz5mpafp0jsn6cufsa7amymh9dengppsrkl9yn")
  }}/>
}
