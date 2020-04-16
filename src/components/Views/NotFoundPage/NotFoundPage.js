import React from "react";
import styled from 'styled-components'

const NotFoundContainer = styled.div`
  height: 100vh;
  background: #f6f6f6; 
  display: flex;
  justify-content:center;
  align-items:center;
`;
const NotFound = styled.div`
  max-width: 767px;
  width: 100%;
  padding: 110px 40px;
  text-align: center;
  background: #fff;
`;
const NotFoundNumber = styled.div`
        position: relative;
        height: 180px;
        & h1 {
            font-family: 'Roboto', sans-serif;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
    font-size: 12rem;
    font-weight: 700;
    color: #262626;
        }
        & h1>span {
        color: #00b7ff;
  }
    
`;
const NotFoundTitle = styled.h2`
    font-size: 2rem;  
    color: #151515;
`;

const NotFoundPage = () => {
  return (
      <NotFoundContainer >
        <NotFound >
          <NotFoundNumber >
            <h1>
              4<span>0</span>4
            </h1>
          </NotFoundNumber>
          <NotFoundTitle>페이지를 찾을수 없습니다.</NotFoundTitle>
        </NotFound>
      </NotFoundContainer>
  );
};

export default NotFoundPage;
