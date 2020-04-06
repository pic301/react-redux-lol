import React from "react";
import styled, { css } from "styled-components";
import { palette } from "../../lib/styles/palette";
import { Link } from "react-router-dom";

const buttonStyle = css`
  /* 공통 스타일 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #ffffff;
  display: inline-flex;
  font-weight: bold;
  outline: none;
  padding: 0 1rem;
  

  /* 크기 */
  font-size: 1rem;
  height: 2.25rem;

  /* 색상 */
  background: ${palette.grape[6]};
  &:hover {
    background: ${palette.grape[7]};
  }
  &:active {
  }
  /* 기타 */
  & + & {
    margin-left: 1rem;
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
  ${props => props.fullWidth && css`
    width:100%;
    text-align:center;
    display:block;
    
  `}
`;
const StyledLinkButton = styled(Link)`
    &:hover {
    text-decoration:none;
  }
`;

const Button = props => {
  return props.to ? (
    <StyledLinkButton {...props}>{props.children}</StyledLinkButton>
  ) : (
    <StyledButton {...props}>{props.children}</StyledButton>
  );
};

export default Button;
