import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL, imgURL } from "../../config";
import styled, {css} from "styled-components";
import Favorite from "./Sections/Favorite";
import Comment from "./Sections/Comment";
import Carousel from "react-bootstrap/Carousel";
import { palette } from "../../../lib/styles/palette";


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

const DetailContainer = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding&display=swap');
  background-color:#ffffff;
  color:${palette.gray[8]}; 
  font-size: 1.1rem;
  font-family: 'Nanum Gothic Coding', monospace;
  line-height:1.5;
  padding:0 10px;
`;
const StyledImage = styled.img`
  width: 100%;
  height: 400px;
`;
const SpellContainer = styled.div`
  display: flex;
  background-color:${palette.gray[2]};
  height:200px;
  
`;
const SpellPassive = styled.div`
  display: flex;
  background-color:${palette.gray[2]};
`;
const Spell = styled.div`
  margin-right: 20px;
  text-align: center;
  & > img {
    width:70px;
    border:3px solid black;
    cursor: pointer;
  }
`;
const SpellName = styled.div`
  font-size: 1rem;
`;
const StyledSkinName = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin-top: 10px;
`;
const PassiveName = styled.div`
`;
const PassiveDescription = styled.div`
    margin:10px;
`;
const DetailChampionContainer = styled.div`
    text-align:center;
    margin:10px;
    padding:10px;
    
`;
const DetailChampionName = styled.div`
   margin:10px;
   ${TextStyle}
`;
const PassiveTitle = styled.div`
   ${TextStyle}
   font-size:2rem;
`;
const SkillTilte = styled.div`
   ${TextStyle}
   font-size:2rem;
`;
const DetailChampionDescripion = styled.div`
  background-color:${palette.gray[2]};
  padding: 20px;
`;

const ChampionDetailPage = ({ match }) => {
  const [detailChampionSkins, setDetailChampionSkins] = useState([]);
  const [detailChampion, setDetailChampion] = useState("");
  const [spellName, setSpellName] = useState("");
  const [spellDescription, setSpellDescription] = useState('');
  const [comments, setComments] = useState([]);
  const { championId } = match.params;

  const variables = { championId: championId };

  useEffect(() => {
    axios.get(`${baseURL}/data/ko_KR/champion/${championId}.json`).then(res => {
      setSpellDescription(res.data.data[championId].spells[0].description)
      setSpellName(res.data.data[championId].spells[0].name)
      setDetailChampion(res.data.data[championId]);
      setDetailChampionSkins(res.data.data[championId].skins);
      window.scrollTo(0, 0)
    });

    axios.post("/api/comment/getComments", variables).then(res => {
      if (res.data.success) {
        console.log(res);
        setComments(res.data.comments);
      } else {
        alert("댓글 가져오는데 실패");
      }
    });
  }, []);

  const refresh = newComment => {
    setComments(comments.concat(newComment));
  };

  const { spells } = detailChampion;

  const _onClick = i => {
    setSpellName(spells[i].name);
    setSpellDescription(spells[i].description);
  };
  return (
    <DetailContainer >
      <Carousel
        controls={true}
        indicators={false}
        interval={3000}
        fade={false}
        style={{ position: "relative" }}
      >
        {detailChampionSkins &&
          Object.keys(detailChampionSkins).map((skin, i) => (
            <Carousel.Item key={detailChampionSkins[i].id}>
              <StyledImage
                src={`${imgURL}/champion/splash/${detailChampion.id}_${detailChampionSkins[i].num}.jpg`}
                alt=""
              />
              {detailChampionSkins[i].name === "default" ? (
                <StyledSkinName>{"기본스킨"}</StyledSkinName>
              ) : (
                <StyledSkinName>{detailChampionSkins[i].name}</StyledSkinName>
              )}
            </Carousel.Item>
          ))}
      </Carousel>
      <div>
        <Favorite
          championId={championId}
          userFrom={localStorage.getItem("userId")}
        />
      </div>
     <div style={{backgroundColor:`${palette.gray[3]}`}}>
     <div style={{textAlign:"center" }}>
      <PassiveTitle>패시브</PassiveTitle>
      </div>
      <SpellPassive>
        {detailChampion && (
          <>
            <div style={{ display: "flex",  justifyContent: "center" ,width:"25%" }}>
              <div style={{display:"flex",flexDirection:'column' ,alignItems:"center"}}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/10.7.1/img/passive/${detailChampion.passive.image.full}`}
                alt=""
              />
              <PassiveName >{detailChampion.passive.name}</PassiveName>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <PassiveDescription>
                {detailChampion.passive.description.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "")}
              </PassiveDescription>
            </div>
          </>
        )}
      </SpellPassive>
      <div style={{textAlign:"center"}}>
      <SkillTilte >스킬</SkillTilte>
      </div>
      <SpellContainer >
          <div style={{display:"flex", width:"50%",}}>
          {spells &&
          Object.keys(spells).map((spell, i) => (
            <div style={{display:"flex", alignItems:"center"}}>
                <Spell key={spells[i].id} >
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/10.7.1/img/spell/${spells[i].image.full}`}
                alt=""
                onClick={() => _onClick(i)}
              />
              <SpellName>{spells[i].name}</SpellName>
            </Spell>
            </div>
          ))}
          </div>
        <div style={{ width:"50%" }}>
          <div style={{ textAlign: "center", margin: "10px", fontSize:"1.5rem" }}>{spellName}</div>
          <div >{spellDescription.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "")}</div>
        </div>
      </SpellContainer>
        <DetailChampionContainer>
          <img src={`https://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/${championId}.png`} alt=""/>
          <DetailChampionName>챔피언:{detailChampion.name}</DetailChampionName>
          <span>역할군:{detailChampion.tags}</span>
        <DetailChampionDescripion>{detailChampion.lore}</DetailChampionDescripion>
        </DetailChampionContainer>
     
     </div>
      {/* 서버에서 온 댓글리스트들 배열을 props로 Comment 에 넘겨준다 */}
      <Comment
        refresh={refresh}
        commentLists={comments}
        championId={championId}
      />
    </DetailContainer>
  );
};
export default ChampionDetailPage;
