import React from "react";
import styled from "styled-components";
import FistImage from "./components/fistImage";
import { Container, Image } from "react-bootstrap";
import NavBar from "./components/NavBar";
import LandingPage from "./components/Views/LandingPage/LandingPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const StyledContainer = styled(Container)`
  margin-bottom: 500px;
  border: 3px solid blue;
  color: #ffffff;
`;

const App = () => {
  return (
    <Router>
      <div style={{ backgroundColor: "#333333" }}>
        <StyledContainer>
          <NavBar />
          <FistImage />
          <Switch>
            <Route exact path="/" component={LandingPage} />
          </Switch>
        </StyledContainer>
      </div>
    </Router>
  );
};

export default App;
