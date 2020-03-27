import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CircleImage from "../../circleImage";
import { palette } from "../../../lib/styles/palette";
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
import Main from "./main_video/main_video";
import SearchSummoners from "./SearchSummoners/SearchSummoners";
import { logoutUser } from "../../../actions/user_actions";
import { useDispatch } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  border: 3px solid red;
  flex-direction: row;
  position: relative;
`;

const ChampionJobBtn = styled.button`
 cursor:pointer;
	position:relative;
	background:white;
	border-top-right-radius:10px;
	border-bottom-left-radius:10px;
	transition:all 1s;
	&:after,&:before{
		content:" ";
		width:10px;
		height:10px;
		position:absolute;
		border :0px solid #fff;
		transition:all 1s;
		}
	&:after{
		top:-1px;
		left:-1px;
		border-top:3px solid ${props => props.color};
		border-left:3px solid ${props => props.color};
	}
	&:before{
		bottom:-1px;
		right:-1px;
		border-bottom:3px solid ${props => props.color};
		border-right:3px solid ${props => props.color};
	}
	&:hover{
		border-top-right-radius:0px;
	border-bottom-left-radius:0px;

		&:before,&:after{
			width:100%;
			height:100%;
		}
	}
`;
const StyledImage = styled(Image)`
  cursor: pointer;
  opacity: 1;
  transition: 1s ease;
  &:hover { opacity: 0.7;
    transition: 1s ease;
  }
`;
const ChampionJobImg = styled.img`
  border-radius:50%;
  width:70px;
  height:70px;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 200px;
  border: 5px solid green;
  color: ${palette.gray[6]};
  font-size: 5rem;
  text-align: center;
  font-family: "Gaegu", cursive;
`;

const LandingPage = () => {
  const dispatch = useDispatch();
  const [champion, setChampion] = useState("");
  const [clickedImage, setClickedImage] = useState("");
  const [SelecedChampions, setSelecedChampions] = useState([]);
  const [championJob, setChampionJob] = useState("Assassin");

  useEffect(() => {
    axios
      .get(`${baseURL}/data/ko_KR/champion.json`)
      .then(res => setChampion(res.data.data))
      .catch(err => console.log(err));
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
  const onLogOut = () => {
    dispatch(logoutUser());
    localStorage.removeItem("userId");
  };
  const ChampionJobHandler = (e) =>{
    console.log(e.target)
    if(e.target.value === undefined){
      return
    }else{
      setChampionJob(e.target.value)
    }
  }
  console.log("챔피온입니다", realChampion);
  console.log("직업입니다", championJob);
  return (
    <div>
      <SearchContainer>
        <div>전적검색</div>
        <SearchSummoners />
      </SearchContainer>
      <Main />
      <Button onClick={onLogOut}>로그아웃</Button>
      <Wrapper>
       <div style={{display:"flex"}}>
          <div style={{ width: "350%", border: "1px solid green" }}>
          <CircleImage />
        </div>
         <div style={{display:"flex",color:"red", flexDirection:"column" }}>
        <ChampionJobBtn  onClick={ChampionJobHandler} value="Assassin" color="#4b0d0b"><ChampionJobImg src="http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/657.png" alt=""/>
        </ChampionJobBtn><div>암살자</div>
        <ChampionJobBtn  onClick={ChampionJobHandler} value="Fighter" color="#663c0f"><ChampionJobImg src="http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/658.png" alt=""/>
        </ChampionJobBtn><div>전사</div>
        <ChampionJobBtn  onClick={ChampionJobHandler} value="Mage" color="#5a82cc"><ChampionJobImg src="http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/659.png" alt=""/>
        </ChampionJobBtn><div>마법사</div>
        <ChampionJobBtn  onClick={ChampionJobHandler} value="Marksman" color="#2a3b26"><ChampionJobImg src="http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/660.png" alt=""/>
        </ChampionJobBtn><div>원거리딜러</div>
        <ChampionJobBtn  onClick={ChampionJobHandler} value="Support" color="#124039"><ChampionJobImg src="http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/661.png" alt=""/>
        </ChampionJobBtn><div>서포터</div>
        <ChampionJobBtn  onClick={ChampionJobHandler} value="Tank" color="#2d3259"><ChampionJobImg src="http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/662.png" alt=""/>
        </ChampionJobBtn><div>탱커</div>
         </div>
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
                  style={{
                    width: "60px",
                    height: "60px",
                    margin: "120px 0 0 0"
                  }}
                  src={`${baseURL}/img/champion/${SelecedChampion}`}
                  alt="SelecedChampion"
                />
              ))}
          </div>
          {realChampion.map((cham, i) => (
            <>
              {cham.tags.find(element => element === `${championJob}`) ? (
                <>
                  {
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
                              </Card.Text>
                              {`HP:${cham.stats.hp}`}
                              {`/MP:${cham.stats.mp}`}
                            </Card.Body>
                          </Card>
                        }
                      >
                        <StyledImage
                          src={`${baseURL}/img/champion/${cham.image.full}`}
                          alt="champion"
                          onClick={() => handleSelectChampion(i)}
                        />
                      </OverlayTrigger>
                      <p style={{ textAlign: "center" }}>
                        <Link to={`/champion/${cham.id}`}>{cham.name}</Link>
                      </p>
                    </Col>
                  }
                </>
              ) : (
                ""
              )}
            </>
          ))}
        </Row>
      </Wrapper>
    </div>
  );
};

export default LandingPage;
