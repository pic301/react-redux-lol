import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import CircleImage from "../../circleImage";
import { palette } from "../../../lib/styles/palette";
import {Row,Col,Image,Card,ProgressBar,OverlayTrigger} from "react-bootstrap";
import { baseURL } from "../../config";
import Main from "./main_video/main_video";
import SearchSummoners from "./SearchSummoners/SearchSummoners";
import "./LandingPage.css";
import Button from '../../common/Button'

// ======================================
//                 Redux
// ======================================
import { logoutUser, } from "../../../actions/user_actions";
import { getChampionData, } from "../../../actions/champion_actions";
import { useDispatch, useSelector } from "react-redux";



// ======================================
//        StyledComponetns
// ======================================

const Wrapper = styled.div`
  display: flex;
  margin-top:10px;
  flex-direction: row;
  position: relative;
`;
const StyledHeaderTitle = styled.div`
  background: 50% 100% / 50% 50% no-repeat
  radial-gradient(ellipse at bottom,#fcc2d7, transparent, transparent);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 3vw;
  font-weight:bold;
  animation: reveal 3000ms ease-in-out forwards 200ms,
  glow 2500ms linear infinite 2000ms;

  @keyframes reveal {
    80%{
      letter-spacing: 8px;
    }
    100% {
      background-size: 300% 300%;
    }
  }
  @keyframes glow {
    40% {
      text-shadow: 0 0 8px #fff;
    }
  }
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
    outline: solid 5px #fab005;
  }
`;
const ChampionJobImg = styled.img`
  border-radius:50%;
  width:50px;
  height:50px;
`;
const ChampionJobTitle = styled.div`
  text-align:center;
  font-size:1.2rem;
  padding: 10px 0;
`;

const SearchContainer = styled.div`
  background: url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Morgana_0.jpg')0 -90px no-repeat;
  background-size:100% 500px;
  color: ${palette.gray[6]};
  font-size: 5rem;
  height: 200px;
  text-align: center;
  width: 100%;
<<<<<<< HEAD
  margin:5px;
  

  --borderWidth: 3px;
  position: relative;
  &::after{
    content: '';
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-1 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(100% + var(--borderWidth) * 2);
  background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
  border-radius: calc(2 * var(--borderWidth));
  z-index: -1;
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
  }
  @keyframes animatedgradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
  }
}
=======
 
>>>>>>> feature/backToTop
`;

const StyledLeftSideImage = styled.img`
    position:absolute;
    left:0;
    width:25%;
    height:60%;
    z-index:-100;
    @media (max-width: 1280px) {
      display:none;
  }
`;
const StyledRightSideImage = styled.img`
    position:absolute;
    right:0;
    width:25%;
    height:60%;
    z-index:-100;
    @media (max-width: 1280px) {
      display:none;
  }
`;

const UserProfile = styled.div`
    display:flex;
    justify-content:flex-end;
`;
const StyledCard = styled(Card)`
  background:${palette.blue[3]};
  width: 40%;
  font-size:1.3rem;
`;
const StyledChampionName = styled.div`
 display:flex;
 flex-direction:column;
 margin: 5px 0;
 text-align:center;
 width:120px;

`;
const ChampionNameButton = styled(Button)`
`;
const BackToTop = styled.button`
    background-color:${palette.gray[3]}; 
    border-radius:5px;
    bottom:6rem;
    cursor: pointer;
    font-weight:700;
    position:fixed;
    padding: 10px;
    right:6rem;
    transition: all 0.3s ease-in-out;

`;

const LandingPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData)
  const champion = useSelector(state => state.champion.championData)


  const [championJob, setChampionJob] = useState("Assassin");
  const [championJobClicked, setChampionJobClicked] = useState(false);
  const [pageYOffset, setPageYOffset] = useState(0);


  const onLogOut = () => {
    dispatch(logoutUser());
    localStorage.removeItem("userId");
    window.location.href = '/';
  }

  const onScroll =()=>{
    setPageYOffset(window.pageYOffset)
  }
  useEffect(() => {
    dispatch(getChampionData())
    window.addEventListener('scroll', onScroll);
    
  }, []);

  if(!champion){
    return null
  }
  const championData = Object.keys(champion).map(cham => champion[cham]);

  const now = 100;

  const ChampionJobHandler = (e) =>{
    if(e.target.value === undefined){
      return
    }else{
      setChampionJob(e.target.value)
      setChampionJobClicked(!championJobClicked)
    }
  }
  const scrollToTop = () =>{
          window.scrollTo(0,0)
    }
  
  return (
    <div className="background"  >
      <StyledLeftSideImage
        src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MasterYi_10.jpg"
        alt=""
      />
      <StyledRightSideImage
        src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fiora_4.jpg"
        alt=""
      />
      <SearchContainer>
        <StyledHeaderTitle>전적검색</StyledHeaderTitle>
        <SearchSummoners />
      </SearchContainer>
      <Main />
     {userData && userData.name ? <UserProfile>
        <StyledCard>
           <Card.Title style={{margin:"10px",fontSize:"1.5rem"}}>{`${userData && userData.name}님 반갑습니다`}</Card.Title>
            <Card.Body>
              <Button onClick={onLogOut}>로그아웃</Button>
            </Card.Body>
        </StyledCard>
      </UserProfile>
    :""  
    }
      <Wrapper>
        <div style={{ display: "flex" }}>
          <div >
            <CircleImage />
          </div>
          <div style={{ display: "flex", flexDirection: "column", margin:"10px" }}>
            <ChampionJobBtn
              onClick={ChampionJobHandler}
              id={championJob === "Assassin" ? "active" : ""}
              value="Assassin"
              color="#4b0d0b"
            >
              <ChampionJobImg
                src="https://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/657.png"
                alt=""
              />
            </ChampionJobBtn>
            <ChampionJobTitle>암살자</ChampionJobTitle>
            <ChampionJobBtn
              onClick={ChampionJobHandler}
              id={championJob === "Fighter" ? "active" : ""}
              value="Fighter"
              color="#663c0f"
            >
              <ChampionJobImg
                src="https://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/658.png"
                alt=""
              />
            </ChampionJobBtn>
            <ChampionJobTitle>전사</ChampionJobTitle>
            <ChampionJobBtn
              onClick={ChampionJobHandler}
              id={championJob === "Mage" ? "active" : ""}
              value="Mage"
              color="#5a82cc"
            >
              <ChampionJobImg
                src="https://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/659.png"
                alt=""
              />
            </ChampionJobBtn>
            <ChampionJobTitle>마법사</ChampionJobTitle>
            <ChampionJobBtn
              onClick={ChampionJobHandler}
              id={championJob === "Marksman" ? "active" : ""}
              value="Marksman"
              color="#2a3b26"
            >
              <ChampionJobImg
                src="https://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/660.png"
                alt=""
              />
            </ChampionJobBtn>
            <ChampionJobTitle>원거리딜러</ChampionJobTitle>
            <ChampionJobBtn
              onClick={ChampionJobHandler}
              id={championJob === "Support" ? "active" : ""}
              value="Support"
              color="#124039"
            >
              <ChampionJobImg
                src="https://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/661.png"
                alt=""
              />
            </ChampionJobBtn>
            <ChampionJobTitle>서포터</ChampionJobTitle>
            <ChampionJobBtn
              onClick={ChampionJobHandler}
              id={championJob === "Tank" ? "active" : ""}
              value="Tank"
              color="#2d3259"
            >
              <ChampionJobImg
                src="https://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/662.png"
                alt=""
              />
            </ChampionJobBtn>
            <ChampionJobTitle>탱커</ChampionJobTitle>
          </div>
        </div>
        <Row>
          {championData.map((cham, i) => (
          <div key={cham.key}>
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
                              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${cham.id}_0.jpg`}
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
                        />
                      </OverlayTrigger>
                        <StyledChampionName  >
                        <ChampionNameButton to={`/champion/${cham.id}`}>
                          {cham.name}
                        </ChampionNameButton>
                      </StyledChampionName>
                    </Col>
                  }
                </>
              ) : (
                ""
              )}
            </>
          </div>
          ))}
        </Row>
      </Wrapper>
      {pageYOffset > 1200 ? <BackToTop onClick={scrollToTop}>TOP</BackToTop>:""}
    </div>
  );
};

export default LandingPage;
