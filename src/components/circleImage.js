import React from "react";
import { Row, Col } from "react-bootstrap";
import circle1 from "../images/Position_Diamond-Top.png";
import circle2 from "../images/Position_Diamond-Jungle.png";
import circle3 from "../images/Position_Diamond-Mid.png";
import circle4 from "../images/Position_Diamond-Bot.png";
import circle5 from "../images/Position_Diamond-Support.png";
import styled from 'styled-components'

const StyledImage = styled.img`
    margin: 10px 0;
`;

const CircleImage = () => {

  return (
    <div
      style={{
        margin: "50px",
        display: "inline-block",
        width: "40%",
        height: "40%"
      }}
    >
      <Row>
        <Col>
          <StyledImage width="150px" height="150px" src={circle1} alt="circle" />
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledImage width="150px" height="150px" src={circle2} alt="circle" />
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledImage width="150px" height="150px" src={circle3} alt="circle" />
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledImage width="150px" height="150px" src={circle4} alt="circle" />
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledImage width="150px" height="150px" src={circle5} alt="circle" />
        </Col>
      </Row>
    </div>
  );
};

export default CircleImage;
