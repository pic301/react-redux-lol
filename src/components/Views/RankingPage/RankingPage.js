import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Axios from "axios";
import { API_KEY } from "../../config";
import styled from "styled-components";

const StyledTd = styled.td`
  color: "palette.gray[0]";
`;


const RankingPage = () => {
  const [challengerleagues, setChallengerleagues] = useState("");
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
  console.log(challengerleagues);
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>순위</th>
            <th>소환사</th>
            <th>티어</th>
            <th>점수</th>
            <th>승률</th>
          </tr>
        </thead>
        <tbody>
          {challengerleagues &&
            challengerleagues.entries.map((challenger, index) => (
              <>
                <tr>
                  <StyledTd> {`${index + 1}위`}</StyledTd>
                  <StyledTd> {challenger.summonerName}</StyledTd>
                  <StyledTd> {challengerleagues.tier}</StyledTd>
                  <StyledTd> {challenger.leaguePoints}</StyledTd>
                  <StyledTd> {`${challenger.wins}승 ${challenger.losses}패`} { `${(challenger.wins/(challenger.wins+challenger.losses))*100}`.substring(0,5)}%</StyledTd>
                </tr>
              </>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RankingPage;
