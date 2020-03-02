import React from "react";
import { Row, Col } from "react-bootstrap";
import circle from "../images/circle-37563_1280.png";
import styled from 'styled-components'

const StyledImage = styled.img`
    margin: 10px 0;
`;

const CircleImage = () => {

  return (
    <div
      style={{
        margin: "10px",
        display: "inline-block",
        width: "40%",
        height: "40%"
      }}
    >
      <Row>
        <Col>
          <StyledImage width="150px" height="150px" src={circle} alt="circle" />
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledImage width="150px" height="150px" src={circle} alt="circle" />
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledImage width="150px" height="150px" src={circle} alt="circle" />
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledImage width="150px" height="150px" src={circle} alt="circle" />
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledImage width="150px" height="150px" src={circle} alt="circle" />
        </Col>
      </Row>
    </div>
  );
};

export default CircleImage;
