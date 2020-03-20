import React, { useEffect, useState } from "react";
import Axios from "axios";
import {API_KEY} from '../../config'

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
    console.log(challengerleagues)
  return (
    <div>
   
          {challengerleagues &&
            challengerleagues.entries.map((challenger, index) => (
              <>
                  <div style={{ color: "red" }}> {`${index + 1}위`}</div>
                  <div style={{ color: "red" }} > {challenger.summonerName}</div>
                  <div style={{ color: "red" }}> {challengerleagues.tier}</div>
                  <div style={{ color: "red" }}> {challenger.leaguePoints}</div>
              </>
            ))}
   
    </div>
  );
};

export default RankingPage;
