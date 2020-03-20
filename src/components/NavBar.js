import React from "react";
import { Nav } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { GiRank3 } from "react-icons/gi";

const NavBar = () => {

  return (
    <Nav activeKey="/home" onSelect style={{ backgroundColor: "#ffffff" }}>
      <Nav.Item style={{ fontSize: "1.5rem" }}>
        <Nav.Link href="/">홈</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/product" style={{ fontSize: "1.5rem" }}>
          <FiShoppingCart />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/favorite" style={{ fontSize: "1.5rem" }}>
          MyFavorite
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/rank" style={{ fontSize: "1.5rem" }}>
          TOP랭킹
          <GiRank3 />
        </Nav.Link>
      </Nav.Item>
        </Nav>
  );
};

export default NavBar;
