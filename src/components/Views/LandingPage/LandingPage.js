import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom'
import styled from "styled-components";
import CircleImage from "../../circleImage";
import {
  Row,
  Col,
  Image,
  Card,
  ProgressBar,
  OverlayTrigger,
  Button
} from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../../config";

const Wrapper = styled.div`
  display: flex;
  border: 3px solid red;
  flex-direction: row;
  position: relative;
`;
const StyledImage = styled(Image)`
  cursor: pointer;
`;

const LandingPage = () => {
  const [champion, setChampion] = useState("");
  const [clickedImage, setClickedImage] = useState("");
  const [SelecedChampions, setSelecedChampions] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/data/ko_KR/champion.json`)
      .then(res => setChampion(res.data.data))
      .catch(err => console.log(err));
    axios.get("/hello").then(res => console.log(res));
  }, []);

  const realChampion = Object.keys(champion).map(cham => champion[cham]);

  const now = 100;

  const handleSelectChampion = useCallback(
    i => {
      setClickedImage(() => realChampion[i].image.full);
    },
    [realChampion]
  );

  if (clickedImage !== "" && SelecedChampions.length < 5) {
    SelecedChampions.push(clickedImage);
  }
  const onLogOut = () =>{
    localStorage.removeItem('userId')
  }
  return (
    <div>
      <Button onClick={onLogOut}>로그아웃</Button>
       <Wrapper>
      <div style={{ width: "350%", border: "1px solid green" }}>
        <CircleImage />
      </div>
      <Row>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: 30,
            left: 0
          }}
        >
          {SelecedChampions &&
            SelecedChampions.map(SelecedChampion => (
              <Image
                style={{ width: "60px", height: "60px", margin: "120px 0 0 0" }}
                src={`${baseURL}/img/champion/${SelecedChampion}`}
                alt="SelecedChampion"
              />
            ))}
        </div>
        {realChampion.map((cham, i) => (
          <Col xs={6} sm={4} md={2} key={cham.key}>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Card style={{ width: "18rem", padding: "1px" }}>
                  <Card.Img
                    variant="top"
                    src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${cham.id}_0.jpg`}
                  />
                  <Card.Body>
                    <Card.Title>{cham.name}</Card.Title>
                    <Card.Text>{cham.title}</Card.Text>
                    <Card.Text>
                      <ProgressBar
                        variant="success"
                        now={now}
                        label={`${now}%`}
                      />
                      {`HP:${cham.stats.hp}`}
                      {`/MP:${cham.stats.mp}`}
                    </Card.Text>
                  </Card.Body>
                </Card>
              }
            >
              <StyledImage
                roundedCircle
                src={`${baseURL}/img/champion/${cham.image.full}`}
                alt="champion"
                onClick={() => handleSelectChampion(i)}
              />
            </OverlayTrigger>
            <p style={{ textAlign: "center", paddingRight: "17px" }}>
              <Link to={`/champion/${cham.id}`}>{cham.name}</Link>
            </p>
          </Col>
        ))}
      </Row>
    </Wrapper>
    </div>   
   
  );
};

export default LandingPage;
