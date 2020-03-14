import React from 'react';
import { Nav} from "react-bootstrap";
import { FiShoppingCart} from "react-icons/fi";

const NavBar = () => {
    return (
        <Nav activeKey="/home" onSelect style={{backgroundColor:"#ffffff"}}>
        <Nav.Item style={{fontSize:"1.5rem"}}>
          <Nav.Link href="/">홈</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/product" style={{fontSize:"1.5rem"}}><FiShoppingCart/></Nav.Link>
        </Nav.Item>
      </Nav>
    );
};

export default NavBar;