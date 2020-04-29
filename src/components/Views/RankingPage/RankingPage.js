import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Axios from "axios";
import { API_KEY } from "../../config";
import styled,{css} from "styled-components";
import { palette } from "../../../lib/styles/palette";
import  Button  from "../../common/Button";
import  {FaStar}  from "react-icons/fa";

const StyledTd = styled.td`
  color:${props => props.nameColor && css`
  ${palette.gray[7]}
  `};
  font-size:1.6rem;
`;
const StyledTable = styled(Table)`
    border:1px solid ${palette.gray[3]};
`;
const StyledStarIcon = styled(FaStar)`
    color:${palette.yellow[6]};
    margin: 0 5px;
`;
const HeaderTitle = styled.h1`
  color: ${palette.gray[8]};
  font-size: 4rem;
  text-align: center;
  font-weight: bold;
`;

const RankingPage = () => {
  const [challengerleagues, setChallengerleagues] = useState("");
  const [leaguesNumber,setLeguesNumber] = useState(0)
  
  useEffect(() => {
    Axios.get(
      `https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${API_KEY}`
    ).then(res => setChallengerleagues(res.data));
  }, []);

  challengerleagues &&
    challengerleagues.entries.sort(function(a, b) {
      if (a.leaguePoints < b.leaguePoints) {
        return 1;
      }
      if (a.leaguePoints > b.leaguePoints) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    
    const onNextHandler =()=>{
      setLeguesNumber(leaguesNumber+100)
      if(leaguesNumber === 200){
        setLeguesNumber(0)
      }
    }
    const onPrevHandler =()=>{
      setLeguesNumber(leaguesNumber-100) 
      if(leaguesNumber === 0){
        setLeguesNumber(200)
      }
    }
  return (
    <div >
      <HeaderTitle>RANKING</HeaderTitle>
      <Button marginTop onClick={onPrevHandler}>{"<"}</Button>
      <Button marginTop onClick={onNextHandler}>{">"}</Button>
      <StyledTable>
        <thead>
          <tr>
            <th>순위</th>
            <th>소환사</th>
            <th>티어</th>
            <th>점수</th>
            <th>승률</th>
          </tr>
        </thead>
          {challengerleagues &&
            Object.values(challengerleagues.entries).slice(leaguesNumber,leaguesNumber+100).map((challenger, index) => (
              <tbody key={challenger.summonerName}>
                {
                  <tr>
                    <StyledTd>{`${index+1+leaguesNumber}위`}</StyledTd>
                    {index < 10 && leaguesNumber < 100?<StyledTd nameColor><StyledStarIcon/>{challenger.summonerName}</StyledTd> :<StyledTd nameColor>{challenger.summonerName}</StyledTd>}
                    <StyledTd>{challengerleagues.tier}</StyledTd>
                    <StyledTd>{challenger.leaguePoints}</StyledTd>
                    <StyledTd>{`${challenger.wins}승 ${challenger.losses}패`}{ `${(challenger.wins/(challenger.wins+challenger.losses))*100}`.substring(0,5)}%</StyledTd>
                  </tr>
                }
              </tbody>
            ))}
      </StyledTable>
      
    </div>
  );
};

export default RankingPage;
