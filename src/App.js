import React from "react";

import styled from "styled-components";
import FistImage from "./components/fistImage";
import {Container, Image} from "react-bootstrap";
import NavBar from './components/NavBar'
import LandingPage from './components/Views/LandingPage/LandingPage'

const StyledContainer = styled(Container)`
  margin-bottom: 500px;
  border: 3px solid blue;
  color: #ffffff;
`;


const App = () => {


  
  return (
    <div style={{ backgroundColor: "#333333" }}>
      <StyledContainer>
        <NavBar/>
        <FistImage />
        <LandingPage/>
      </StyledContainer>
      
    </div>
     
  );
};

export default App;
