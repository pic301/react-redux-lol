import styled, {css} from "styled-components";
import { palette } from "../../lib/styles/palette";

const TextStyle = css`
  color: #fff;
  font-size: 2rem;
  font-weight:bold;
  background: linear-gradient(to right, #cc5de8 10%, #fff 50%, #4dabf7 60%);
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 3.5s linear infinite;
  display: inline-block;
  @keyframes textclip {
    to {
      background-position: 200% center;
    }
  }
`;

export const DetailContainer = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding&display=swap');
  background-color:#ffffff;
  color:${palette.gray[8]}; 
  font-size: 1.1rem;
  font-family: 'Nanum Gothic Coding', monospace;
  line-height:1.5;
  padding:0 10px;
  & .carousel {
    position: relative;
  }
`;
export const StyledImage = styled.img`
  width: 100%;
  height: 400px;
`;
export const SpellContainer = styled.div`
  display: flex;
  background-color:${palette.gray[2]};
  height:200px;
  
`;
export const SpellPassive = styled.div`
  display: flex;
  background-color:${palette.gray[2]};
`;
export const Spell = styled.div`
  margin-right: 20px;
  text-align: center;
  & > img {
    width:70px;
    border:3px solid black;
    cursor: pointer;
  }
`;
export const SpellName = styled.div`
  font-size: 1rem;
`;
export const StyledSkinName = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin-top: 10px;
`;
export const PassiveName = styled.div`
`;
export const PassiveDescription = styled.div`
    margin:10px;
`;
export const DetailChampionContainer = styled.div`
    text-align:center;
    margin:10px;
    padding:10px;
    
`;
export const DetailChampionName = styled.div`
   margin:10px;
   ${TextStyle}
`;
export const PassiveTitle = styled.div`
   ${TextStyle}
   font-size:2rem;
`;
export const SkillTilte = styled.div`
   ${TextStyle}
   font-size:2rem;
`;
export const DetailChampionDescripion = styled.div`
  background-color:${palette.gray[2]};
  padding: 20px;
`;