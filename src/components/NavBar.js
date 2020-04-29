import React from "react";
import { Nav, Badge } from "react-bootstrap";
import { FaStoreAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { AiTwotoneHeart } from "react-icons/ai";
import { FaTrophy,FaTwitterSquare,FaFacebookSquare,FaInstagram } from "react-icons/fa";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledNav = styled(Nav)`
    font-size:1.9rem;
    padding:20px;
`;
const NavContainer = styled.header`
   display:flex;
   justify-content:space-between;
   align-items:baseline;
`;
const HeaderRightIcons = styled.div`
   font-size:1.6rem;
   & > {
    color:${props => props.color}
   }
`;
const NavBar = () => {
  const myCarts = useSelector(state => state.user.userData);
  return (
    <NavContainer >
    <StyledNav  activeKey="/home">
      <Nav.Item>
        <Nav.Link href="/">
          <GoHome/>
          </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/product" >
          <FaStoreAlt />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/favorite">
          <AiTwotoneHeart/>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/rank" >
          <FaTrophy/>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/cart" >
         <div>
         <FiShoppingCart />
          {myCarts && myCarts.cart && Object.keys(myCarts.cart).length > 0 ? (
            <div style={{position:"relative"}}>
              <Badge pill={true} variant="danger" style={{position:"absolute",top:-42,left:18 ,padding:"1px 5px 0 5px",borderRadius:"50%"}}>
                {Object.keys(myCarts.cart).length}
              </Badge>{" "}
            </div>
          ) : (
            ""
          )}
         </div>
        </Nav.Link>
      </Nav.Item>
    </StyledNav>
      <HeaderRightIcons>
        <a href="https://twitter.com/">
          <FaTwitterSquare />        
        </a>
        <a href="https://www.instagram.com/">
          <FaInstagram />        
        </a>
        <a href="https://ko-kr.facebook.com/">
          <FaFacebookSquare />       
        </a>
      </HeaderRightIcons>
  </NavContainer>
  );
};

export default NavBar;
