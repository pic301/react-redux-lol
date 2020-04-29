import React, { useState, useEffect, useCallback } from "react";
import CircleImage from "../../circleImage";
import { Row, Col, Card, ProgressBar, OverlayTrigger } from "react-bootstrap";
import { baseURL } from "../../config";
import { imgURL } from "../../config";
import Main from "./main_video/main_video";
import SearchSummoners from "./SearchSummoners/SearchSummoners";
import Button from "../../common/Button";
import {
  StyledCard,
  StyledImage,
  ChampionNameButton,
  ChampionJobTitle,
  Wrapper,
  StyledHeaderTitle,
  ChampionJobBtn,
  SearchContainer,
  StyledLeftSideImage,
  StyledRightSideImage,
  UserProfile,
  StyledChampionName,
  StyledChampionCard,
  BackToTop,
  JobButtonsContainer
} from "../../styles/LandingPageStyle";

// ======================================
//                 Redux
// ======================================
import { logoutUser } from "../../../actions/user_actions";
import { getChampionData } from "../../../actions/champion_actions";
import { useDispatch, useSelector } from "react-redux";

const CHAMPION_HP = 100;

const CHAMPION_JOB_OBJS = [
  {
    job: "Assassin",
    otherJobName: "암살자",
    color: "#4b0d0b",
    url: `${baseURL}/img/profileicon/657.png`
  },
  {
    job: "Fighter",
    otherJobName: "전사",
    color: "#663c0f",
    url: `${baseURL}/img/profileicon/658.png`
  },
  {
    job: "Mage",
    otherJobName: "마법사",
    color: "#5a82cc",
    url: `${baseURL}/img/profileicon/659.png`
  },
  {
    job: "Marksman",
    otherJobName: "원거리딜러",
    color: "#2a3b26",
    url: `${baseURL}/img/profileicon/660.png`
  },
  {
    job: "Support",
    otherJobName: "서포터",
    color: "#124039",
    url: `${baseURL}/img/profileicon/661.png`
  },
  {
    job: "Tank",
    otherJobName: "탱커",
    color: "#2d3259",
    url: `${baseURL}/img/profileicon/662.png`
  }
];

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
  }, [dispatch]);

  const onScroll = useCallback(() => {
    setPageYOffset(window.pageYOffset);
  }, []);

  useEffect(() => {
    dispatch(getChampionData());
    window.addEventListener("scroll", onScroll);
  }, [dispatch,onScroll]);

  if (!champion) {
    return null;
  }
  const championData = Object.keys(champion).map(cham => champion[cham]);

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

  const JobButtons = CHAMPION_JOB_OBJS.map(championJobObj => {
    return (
      <>
        <ChampionJobBtn
          onClick={ChampionJobHandler}
          value={championJobObj.job}
          color={championJobObj.color}
          url={championJobObj.url}
        ></ChampionJobBtn>
        <ChampionJobTitle>{championJobObj.otherJobName}</ChampionJobTitle>
      </>
    );
  });

  return (
    <div className="background">
      <StyledLeftSideImage
        src={`${imgURL}/champion/splash/MasterYi_10.jpg`}
        alt=""
      />
      <StyledRightSideImage
        src={`${imgURL}/champion/splash/Fiora_4.jpg`}
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
        <div>
          <div>
            <CircleImage />
          </div>
          <JobButtonsContainer
            
          >
            {JobButtons}
          </JobButtonsContainer>
        </div>
        <Row>
          {championData.map(cham => (
            <div key={cham.key}>
              <>
                {cham.tags.find(element => element === `${championJob}`) ? (
                  <>
                    {
                      <Col xs={6} sm={4} md={2} key={cham.key}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <StyledChampionCard>
                              <Card.Img
                                variant="top"
                                src={`${imgURL}/champion/splash/${cham.id}_0.jpg`}
                              />
                              <Card.Body>
                                <Card.Title>{cham.name}</Card.Title>
                                <Card.Text>{cham.title}</Card.Text>
                                <Card.Text>
                                  <ProgressBar
                                    variant="success"
                                    now={CHAMPION_HP}
                                    label={`${CHAMPION_HP}%`}
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
