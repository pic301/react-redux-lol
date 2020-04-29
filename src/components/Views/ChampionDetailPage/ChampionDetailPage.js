import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL, imgURL } from "../../config";
import Favorite from "./Sections/Favorite";
import Comment from "./Sections/Comment";
import Carousel from "react-bootstrap/Carousel";
import { palette } from "../../../lib/styles/palette";
import {DetailContainer,StyledImage,SpellContainer,SpellPassive,Spell,SpellName,StyledSkinName,PassiveName,PassiveDescription,DetailChampionContainer,DetailChampionName,PassiveTitle,SkillTilte,DetailChampionDescripion} from '../../styles/ChampionDetailStyle'

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

  const PropsObj ={
    controls:true,
    indicators:false,
    interval:3000,
    fade:false,
  }
  return (
    <DetailContainer >
      <Carousel
        {...PropsObj}
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
