import React from "react";
import styled from "styled-components";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from './hoc/auth'
// ==============================
//           Pages
// ==============================
import LandingPage from "./components/Views/LandingPage/LandingPage";
import ProductPage from "./components/Views/ProductPage/ProductPage";
import LoginPage from "./components/Views/LoginPage/LoginPage";
import RegisterPage from "./components/Views/RegisterPage/RegisterPage";
import ChampionDetailPage from "./components/Views/ChampionDetailPage/ChampionDetailPage";
import RankingPage from "./components/Views/RankingPage/RankingPage";
import SearchResultPage from "./components/Views/SearchResultPage/SearchResultPage";

// ==============================
//           Bootstrap
// ==============================
import { Container } from "react-bootstrap";
import FavoritePage from "./components/Views/FavoritePage/FavoritePage";

const StyledContainer = styled(Container)`
  margin-bottom: 500px;
  border: 3px solid blue;
  color: #ffffff;
`;

const App = () => {

  return (
    <Router>
      <div >
        <StyledContainer>
          <Switch>
            <Route path="/login" render={() => null} />
            <Route path="/register" render={() => null} />
            <Route
              render={() => (
                <>
                  <NavBar />
                </>
              )}
            />
          </Switch>

          <Switch>component={Auth(LoginPage, null)}
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/product" component={Auth(ProductPage, true)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/champion/:championId" component={Auth(ChampionDetailPage, true)} />
            <Route exact path="/favorite" component={Auth(FavoritePage, true)} />
            <Route exact path="/rank" component={Auth(RankingPage, null)} />
            <Route exact path="/summoner/:summonerName" component={SearchResultPage} />
          </Switch>
        </StyledContainer>
      </div>
    </Router>
  );
};

export default App;
