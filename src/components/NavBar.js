import React from "react";
import { Nav,InputGroup,FormControl,Button } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { GiRank3 } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";


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
          Top랭킹
          <GiRank3 />
        </Nav.Link>
      </Nav.Item>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="소환사 명을 입력해주세요"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary"><FaSearch/></Button>
        </InputGroup.Append>
      </InputGroup>
    </Nav>
  );
};

export default NavBar;
