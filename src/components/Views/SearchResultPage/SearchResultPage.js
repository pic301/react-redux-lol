import React, { useState, useEffect } from "react";
import { API_KEY } from "../../config";
import axios from "axios";
import styled from 'styled-components'
import { Row, Col, Container, Card } from "react-bootstrap";
import {palette} from '../../../lib/styles/palette' 
const StyledSummonerDataCard = styled(Card)`
  display:flex;
  flex-direction:row;
  & >.card-body{

  }& .card-title{
    font-size:1.8rem;
    margin:7px 0;
  } 
  & .card-text{
    margin:7px 0;
  }
`;
const StyledTierImage = styled.div`
  width:150px;
  height:160px;
  background: url("https://static.developer.riotgames.com/img/docs/lol/emblems_and_positions.png") -717px 0 no-repeat;
`;
const ProfileIconImage = styled.img`
    width:120px;
    height:120px;
`;
const SummonerBorderImage = styled.div`
  position:absolute;
  top:70px;
  left:30px;
  width:50px;
  height:50px;
  background: url("https://pixabay.com/get/54e9d2454d57b108f5d08460da293276133fd9e1555177_1280.png") 0px 0px no-repeat;
  background-size: 100% 100%;
  display:flex;
  justify-content:center;
  align-items:center;
  & > div{
    color:${palette.yellow[5]};
    font-weight:bold;
  }
`;
const dummy = {
  summonName:"crl",
  summonerData:{tier:"DIAMOND",rank:"IV",leaguePoints:"100",wins:200,losses:300}
}

const SearchResultPage = ({ match }) => {
  const summonName = match.params.summonerName;
  // const [summonerData, setSummonerData] = useState("");
  const [summonerDefaultData, setSummonerDefaultData] = useState("");
  const [summonerMatchInfo, setSummonerMatchInfo] = useState("");
  const {profileIconId,summonerLevel} = summonerDefaultData
  console.log(profileIconId,summonerLevel)
  useEffect(() => {
    const getSummonerData = async () => {
      let summonerId = 0;
      let encryptedAccountId = 0;
      await axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonName}?api_key=${API_KEY}`
        )
        .then(res => {
          summonerId = res.data.id
          encryptedAccountId = res.data.accountId
          setSummonerDefaultData(res.data)
          console.log('소환사',res.data)
        })
        //주어진 계정 ID 및 플랫폼 ID에서 재생되고 주어진 필터 매개 변수를 사용하여 필터링 된 게임에 대한 일치 목록을 가져옵니다 (있는 경우).
        // 여기서 gameId, 어떤챔피온인지 champion 
        axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${encryptedAccountId}?api_key=${API_KEY}`
        ).then(res => {
         
          setSummonerMatchInfo((res.data.matches))
        })
        // axios.get(
        //   `https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`
        // ).then(res => setSummonerData(res.data));
    };
    getSummonerData();
  }, [summonName]);

//  console.log('소환사정보',summonerData)
// style={{border:"4px solid orange"}}
console.log('매치정보',(Object.keys(summonerMatchInfo).map(index => (summonerMatchInfo[index].champion))))
const MatchInfoInChampion = Object.keys(summonerMatchInfo).map(index => <div>{summonerMatchInfo[index].champion}</div>)
  return (
  <>
    <div style={{ color: "black",border:"4px solid green" }}>
      <div style={{display:"flex",width:"100%",height:"200px" ,border:"10px solid orange"}}>
          <div style={{width:"30%",height:"100%",border:"5px solid green",position:"relative"}}>
            <ProfileIconImage src={`http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/${profileIconId}.png`} alt=""/>
            <SummonerBorderImage><div>{summonerLevel}</div></SummonerBorderImage>
          </div>
          <img src="" alt=""/>
          <div style={{width:"70%",height:"100%",border:"5px solid red"}}></div>
      </div>
      {/* {summonerData && <Container style={{ border: "3px solid red" }}> */}
      {<Container style={{ border: "8px solid red" }}>
        <Row>
          <Col style={{ border: "7px solid green" }} sm={4}>
            <StyledSummonerDataCard>
            <StyledTierImage></StyledTierImage>
              <Card.Body >
                <div>솔로랭크</div>
                <Card.Title>{dummy.summonName}</Card.Title>
                <Card.Text>
                  {`${dummy.summonerData.tier } ${dummy.summonerData.rank}`}
                </Card.Text>
                <Card.Text>{`${dummy.summonerData.leaguePoints}점`}</Card.Text>
                <Card.Text>
                  {`${dummy.summonerData.wins}승${dummy.summonerData.losses}패`}
                </Card.Text>
              </Card.Body>
              {/* <Card.Body>
                <Card.Title>{dummy.summonName}</Card.Title>
                <Card.Text>
                  {`${dummy.summonerData[0].tier } ${dummy.summonerData[0].rank}`}
                </Card.Text>
                <Card.Text>{`${dummy.summonerData[0].leaguePoints}점`}</Card.Text>
                <Card.Text>
                  {`${dummy.summonerData[0].wins}승${dummy.summonerData[0].losses}패`}
                </Card.Text>
              </Card.Body> */}
            </StyledSummonerDataCard>
          </Col>
          <Col style={{ border: "5px solid blue" }} sm={8}>
          {MatchInfoInChampion}
          </Col>
        </Row>
      </Container>}
    </div>
  </>
  );
};

export default SearchResultPage;
