// ======================================
//        StyledComponetns
// ======================================
import styled from 'styled-components'
import { palette } from "../../lib/styles/palette";
import {Image,Card} from "react-bootstrap";
import Button from "../common/Button";

export const Wrapper = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: row;
  position: relative;
`;
export const StyledHeaderTitle = styled.div`
  background: 50% 100% / 50% 50% no-repeat
    radial-gradient(ellipse at bottom, #fcc2d7, transparent, transparent);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 3vw;
  font-weight: bold;
  animation: reveal 3000ms ease-in-out forwards 200ms,
    glow 2500ms linear infinite 2000ms;

  @keyframes reveal {
    80% {
      letter-spacing: 8px;
    }
    100% {
      background-size: 300% 300%;
    }
  }
  @keyframes glow {
    40% {
      text-shadow: 0 0 8px #fff;
    }
  }
`;

export const ChampionJobBtn = styled.button`
  width: 50px;
  height: 50px;
  background: url(${props => props.url}) 0 0 no-repeat;
  background-size: 50px 50px;
  cursor: pointer;
  position: relative;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  transition: all 1s;
  &:after,
  &:before {
    content: " ";
    width: 10px;
    height: 10px;
    position: absolute;
    border: 0px solid #fff;
    transition: all 1s;
  }
  &:after {
    top: -1px;
    left: -1px;
    border-top: 3px solid ${props => props.color};
    border-left: 3px solid ${props => props.color};
  }
  &:before {
    bottom: -1px;
    right: -1px;
    border-bottom: 3px solid ${props => props.color};
    border-right: 3px solid ${props => props.color};
  }
  &:hover {
    border-top-right-radius: 0px;
    border-bottom-left-radius: 0px;

    &:before,
    &:after {
      width: 100%;
      height: 100%;
    }
  }
`;
export const StyledImage = styled(Image)`
  cursor: pointer;
  opacity: 1;
  transition: 1s ease;
  &:hover {
    opacity: 0.7;
    transition: 1s ease;
    outline: solid 5px #fab005;
  }
`;
export const ChampionJobTitle = styled.div`
  text-align: center;
  font-size: 1rem;
  padding: 10px 0;
`;

export const SearchContainer = styled.div`
  background: url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Morgana_0.jpg')0 -90px no-repeat;
  background-size:100% 500px;
  color: ${palette.gray[6]};
  font-size: 5rem;
  height: 200px;
  text-align: center;
  width: 100%;
  margin:5px;
  

  --borderWidth: 3px;
  position: relative;
  &::after{
    content: '';
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-1 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(100% + var(--borderWidth) * 2);
  background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
  border-radius: calc(2 * var(--borderWidth));
  z-index: -1;
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
  }
  @keyframes animatedgradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
  }
}
`;

export const StyledLeftSideImage = styled.img`
  position: absolute;
  left: 0;
  width: 25%;
  height: 60%;
  z-index: -100;
  @media (max-width: 1280px) {
    display: none;
  }
`;
export const StyledRightSideImage = styled.img`
  position: absolute;
  right: 0;
  width: 25%;
  height: 60%;
  z-index: -100;
  @media (max-width: 1280px) {
    display: none;
  }
`;
export const UserProfile = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const StyledCard = styled(Card)`
  background: ${palette.blue[3]};
  width: 40%;
  font-size: 1.3rem;
`;
export const StyledChampionName = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  text-align: center;
  width: 120px;
`;
export const ChampionNameButton = styled(Button)``;

export const StyledChampionCard = styled(Card)`
  width: 18rem;
  padding: 5px;
  & .card-text{
    margin-top:10px;
  }
`;

export const BackToTop = styled.button`
  background-color: ${palette.gray[3]};
  border-radius: 5px;
  bottom: 6rem;
  cursor: pointer;
  font-weight: 700;
  position: fixed;
  padding: 10px;
  right: 6rem;
  transition: all 0.3s ease-in-out;
`;
