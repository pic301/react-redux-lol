import React, { useState, useEffect } from "react";
import { API_KEY } from "../../config";
import axios from "axios";
import { Row, Col, Container, Card } from "react-bootstrap";

const SearchResultPage = ({ match }) => {
  const summonName = match.params.summonerName;
  const [summonerData, setSummonerData] = useState("");
  useEffect(() => {
    const getData = async () => {
      let summonerId = 0;
      await axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonName}?api_key=${API_KEY}`
        )
        .then(res => {
          summonerId = res.data.id
          console.log('소환사아이디',summonerId)
        })
        axios.get(
          `https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`
        ).then(res => setSummonerData(res.data));
    };
    getData();
  }, [summonName]);

 console.log('소환사정보',summonerData)

  return (
    <div style={{ border: "3px solid green", color: "black" }}>
      <Container style={{ border: "3px solid red" }}>
        <Row>
          <Col style={{ border: "3px solid pulple" }} sm={4}>
            <Card>
              <Card.Body>
                <Card.Title>{summonName}</Card.Title>
                <Card.Text>
                  {`${summonerData && summonerData[0].tier} ${summonerData && summonerData[0].rank}`}
                </Card.Text>
                <Card.Text>{`${summonerData && summonerData[0].leaguePoints}점`}</Card.Text>
                <Card.Text>
                  {`${summonerData && summonerData[0].wins}승${summonerData && summonerData[0].losses}패`}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col style={{ border: "3px solid blue" }} sm={8}>
            1 of 3
          </Col>
        </Row>

        <Row>
          <Col style={{ border: "3px solid pulple" }} sm={4}>
            <Card>
              <Card.Body>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col style={{ border: "3px solid blue" }} sm={8}>
            1 of 3
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchResultPage;
