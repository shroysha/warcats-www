
import styled, { css } from 'styled-components'


const SocialButtonStyled = styled.image<{}>`
  width: 1512;
  height: 152;
  &:hover {
    background-color: #0cbaba;
    background-image: linear-gradient(315deg, #0cbaba 0%, #380036 74%);
    filter: sepia(1000%) hue-rotate(90deg) saturate(500%);
    cursor: pointer;
  }
`;

interface SocialButtonProps {
  href: string,
  x: string, 
  y: string,
  imageHref: string,
}

const SocialButton = (props: SocialButtonProps) => {
  return <SocialButtonStyled x={props.x} y={props.y} href={props.imageHref} onClick={() => {
    window.open(props.href)
  }}/>
}

export default SocialButton
