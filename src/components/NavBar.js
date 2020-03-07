import React from 'react';
import { Nav} from "react-bootstrap";

const NavBar = () => {
    return (
        <Nav activeKey="/home" onSelect style={{backgroundColor:"#ffffff"}}>
        <Nav.Item>
          <Nav.Link href="/home">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>Link</Nav.Link>
        </Nav.Item>
      </Nav>
    );
};

export default NavBar;