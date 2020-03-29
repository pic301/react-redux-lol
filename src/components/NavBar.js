import React from "react";
import { Nav, Badge } from "react-bootstrap";
import { FaStoreAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { AiTwotoneHeart } from "react-icons/ai";
import { useSelector } from "react-redux";

const NavBar = () => {
  const myCarts = useSelector(state => state.user.userData);

  return (
    <Nav activeKey="/home" onSelect style={{padding:"20px"}}>
      <Nav.Item style={{ fontSize: "2rem" }}>
        <Nav.Link href="/">
          <GoHome/>
          </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/product" style={{ fontSize: "2rem" }}>
          <FaStoreAlt />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/favorite" style={{ fontSize: "2rem" }}>
          <AiTwotoneHeart/>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/rank" style={{ fontSize: "2rem" }}>
          랭킹
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/cart" style={{ fontSize: "2rem" }}>
         <div>
         <FiShoppingCart />
          {myCarts && myCarts !== "undefined" && myCarts !== null && Object.keys(myCarts.cart).length > 0 ? (
            <div style={{position:"relative"}}>
              <Badge pill={true} variant="danger" style={{position:"absolute",top:-39,left:18,padding:"4px 4px"}}>
                {Object.keys(myCarts.cart).length}
              </Badge>{" "}
            </div>
          ) : (
            ""
          )}
         </div>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavBar;
