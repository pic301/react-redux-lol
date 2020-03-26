import React from "react";
import { Nav, Badge } from "react-bootstrap";
import { FaStoreAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";

const NavBar = () => {
  const myCarts = useSelector(state => state.user.userData);

  return (
    <Nav activeKey="/home" onSelect style={{ backgroundColor: "#ffffff" }}>
      <Nav.Item style={{ fontSize: "1.5rem" }}>
        <Nav.Link href="/">홈</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/product" style={{ fontSize: "1.5rem" }}>
          상점
          <FaStoreAlt />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/favorite" style={{ fontSize: "1.5rem" }}>
          MyFavorite
          <img
            style={{ marginLeft: "5px" }}
            width="35px"
            height="10%"
            src="http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/4354.png"
            alt=""
          />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/rank" style={{ fontSize: "1.5rem" }}>
          랭킹
          <img
            style={{ marginLeft: "5px" }}
            width="35px"
            height="10%"
            src="http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/4355.png"
            alt=""
          />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/cart" style={{ fontSize: "1.5rem" }}>
         <div>
         <FiShoppingCart />
          {myCarts && myCarts !== undefined && Object.keys(myCarts.cart).length > 0 ? (
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
