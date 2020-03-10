import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL, imgURL } from "../../config";
import styled from "styled-components";

import Carousel from "react-bootstrap/Carousel";

const StyledImage = styled.img`
  width: 100%;
  height: 400px;
`;
const SpellContainer = styled.div`
  display: flex;
  border: 2px solid green;
`;
const SpellPassive = styled.div`
  margin-right: 20px;
`;

const Spell = styled.div`
  margin-right: 20px;
  text-align: center;
`;

const ChampionDetailPage = ({ match }) => {
  const [detailChampionSkins, setDetailChampionSkins] = useState([]);
  const [detailChampion, setDetailChampion] = useState("");
  const [spellName, setSpellName] = useState("");
  const [spellDescription, setSpellDescription] = useState("");
  
  const { championId } = match.params;

  useEffect(() => {
    axios.get(`${baseURL}/data/ko_KR/champion/${championId}.json`).then(res => {
      setDetailChampion(res.data.data[championId]);
      setDetailChampionSkins(res.data.data[championId].skins);
    });
  }, []);

  const { spells } = detailChampion;

  const _onClick = (i) =>{
  
      setSpellName(spells[i].name)
      setSpellDescription(spells[i].description)
  }

  return (
    <>
      <Carousel controls={true} indicators={false} interval={3000} fade={false}>
        {detailChampionSkins &&
          Object.keys(detailChampionSkins).map((skin, i) => (
            <Carousel.Item>
              <StyledImage
                src={`${imgURL}/champion/splash/${detailChampion.id}_${detailChampionSkins[i].num}.jpg`}
                alt=""
              />
              <p style={{ color: "red" }}>{detailChampionSkins[i].name}</p>
            </Carousel.Item>
          ))}
      </Carousel>
        <SpellPassive>
          {detailChampion.passive && (
            <>
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/10.5.1/img/passive/${detailChampion.passive.image.full}`}
                alt=""
              />
              <p style={{ color: "black" }}>{detailChampion.passive.name}</p>
              <p style={{ color: "black" }}>{detailChampion.passive.description}</p>
            </>
          )}
        </SpellPassive>
      <SpellContainer>

        {spells &&
          Object.keys(spells).map((spell, i) => (
            <Spell>
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/10.5.1/img/spell/${spells[i].image.full}`}
                alt=""
                onClick={() => _onClick(i)}
              />
              <p style={{ color: "black" }}>{spells[i].name}</p>
            </Spell>
          ))}
         {
         }
       <div style={{color:"red", width:"40%"}} >
          <div>{spellName}</div>
          <div>{spellDescription}</div>
       </div>
      </SpellContainer>
      <h2 style={{ color: "black" }}>
        {detailChampion.name}
        <span>{detailChampion.tags}</span>
      </h2>
      <p style={{ color: "black" }}>{detailChampion.lore}</p>
    </>
  );
};
export default ChampionDetailPage;
