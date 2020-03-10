import React from "react";
import styled from "styled-components";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// ==============================
//           Pages
// ==============================
import LandingPage from "./components/Views/LandingPage/LandingPage";
import ProductPage from "./components/Views/ProductPage/ProductPage";
import LoginPage from "./components/Views/LoginPage/LoginPage";
import RegisterPage from "./components/Views/RegisterPage/RegisterPage";
import ChampionDetailPage from "./components/Views/ChampionDetailPage/ChampionDetailPage";

// ==============================
//           Bootstrap
// ==============================
import { Container } from "react-bootstrap";

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

          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/product" component={ProductPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/champion/:championId" component={ChampionDetailPage} />
          </Switch>
        </StyledContainer>
      </div>
    </Router>
  );
};

export default App;
