import React, { useState, useEffect, useCallback } from "react";
import CircleImage from "../../circleImage";
import {Row,Col,Image,Card,ProgressBar,OverlayTrigger} from "react-bootstrap";
import { baseURL } from "../../config";
import Main from "./main_video/main_video";
import SearchSummoners from "./SearchSummoners/SearchSummoners";
import Button from "../../common/Button";
import {StyledCard,StyledImage,ChampionNameButton,ChampionJobTitle,Wrapper,StyledHeaderTitle,ChampionJobBtn,SearchContainer,StyledLeftSideImage,StyledRightSideImage,UserProfile,StyledChampionName,StyledChampionCard,BackToTop} from '../../styles/LandingPageStyle'

// ======================================
//                 Redux
// ======================================
import { logoutUser } from "../../../actions/user_actions";
import { getChampionData } from "../../../actions/champion_actions";
import { useDispatch, useSelector } from "react-redux";


const LandingPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData);
  const champion = useSelector(state => state.champion.championData);

  const [championJob, setChampionJob] = useState("Assassin");
  const [championJobClicked, setChampionJobClicked] = useState(false);
  const [pageYOffset, setPageYOffset] = useState(0);

  const onLogOut = useCallback(() => {
    dispatch(logoutUser());
    localStorage.removeItem("userId");
    window.location.href = "/";
  },[dispatch])

  const onScroll = () => {
    setPageYOffset(window.pageYOffset);
  };
  useEffect(() => {
    dispatch(getChampionData());
    window.addEventListener("scroll", onScroll);
  }, []);

  if (!champion) {
    return null;
  }
  const championData = Object.keys(champion).map(cham => champion[cham]);

  const now = 100;

  const ChampionJobHandler = e => {
    if (e.target.value === undefined) {
      return;
    } else {
      setChampionJob(e.target.value);
      setChampionJobClicked(!championJobClicked);
    }
  };
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="background">
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
      {userData && userData.name ? (
        <UserProfile>
          <StyledCard>
            <Card.Title
              style={{ margin: "10px", fontSize: "1.5rem" }}
            >{`${userData && userData.name}님 반갑습니다`}</Card.Title>
            <Card.Body>
              <Button onClick={onLogOut}>로그아웃</Button>
            </Card.Body>
          </StyledCard>
        </UserProfile>
      ) : (
        ""
      )}
      <Wrapper>
        <div style={{ display: "flex" }}>
          <div>
            <CircleImage />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", margin: "10px" }}
          >
            <ChampionJobBtn
              onClick={ChampionJobHandler}
              value="Assassin"
              color="#4b0d0b"
              url="https://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/657.png"
            >
            </ChampionJobBtn>
            <ChampionJobTitle>암살자</ChampionJobTitle>
            <ChampionJobBtn
              onClick={ChampionJobHandler}
              value="Fighter"
              color="#663c0f"
              url="https://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/658.png"
            >
            </ChampionJobBtn>
            <ChampionJobTitle>전사</ChampionJobTitle>
            <ChampionJobBtn
              onClick={ChampionJobHandler}
              value="Mage"
              color="#5a82cc"
              url="https://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/659.png"
            >
            </ChampionJobBtn>
            <ChampionJobTitle>마법사</ChampionJobTitle>
            <ChampionJobBtn
              onClick={ChampionJobHandler}
              value="Marksman"
              color="#2a3b26"
              url="https://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/660.png"
            >
            </ChampionJobBtn>
            <ChampionJobTitle>원거리딜러</ChampionJobTitle>
            <ChampionJobBtn
              onClick={ChampionJobHandler}
              id={championJob === "Support" ? "active" : ""}
              value="Support"
              color="#124039"
              url="https://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/661.png"
            >
            </ChampionJobBtn>
            <ChampionJobTitle>서포터</ChampionJobTitle>
            <ChampionJobBtn
              onClick={ChampionJobHandler}
              id={championJob === "Tank" ? "active" : ""}
              value="Tank"
              color="#2d3259"
              url="https://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/662.png"
            >
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
                            <StyledChampionCard >
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
                            </StyledChampionCard>
                          }
                        >
                          <StyledImage
                            src={`${baseURL}/img/champion/${cham.image.full}`}
                            alt="champion"
                          />
                        </OverlayTrigger>
                        <StyledChampionName>
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
      {pageYOffset > 1200 ? (
        <BackToTop onClick={scrollToTop}>TOP</BackToTop>
      ) : (
        ""
      )}
    </div>
  );
};

export default LandingPage;
