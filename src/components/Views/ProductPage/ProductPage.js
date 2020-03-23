import React, { useState, useEffect } from "react";
import { Card, Row, Col, Pagination,ListGroupItem,ListGroup } from "react-bootstrap";
import Axios from "axios";
import {CORS_ANYWHERE,API_KEY_SHOP} from '../../config'
import styled from 'styled-components'
import { palette } from '../../../lib/styles/palette'
const parser = require("fast-xml-parser");

const ProductContainer = styled.div`
  color:${palette.gray[8]};
`;
const HeaderTitle = styled.div`
  color:${palette.gray[8]};
  font-size:4rem;
  text-align: center;
  font-weight:bold;
`;

const CartButton = styled.button`
  background-color:${palette.gray[0]};
  color:${palette.gray[9]};
  padding: 10px;
`;
const ImmediatelyPurchaseButton = styled.button`
  margin-left: 10px;
  background-color:${palette.gray[0]};
  color:#ffffff;
  padding: 10px;
  background-color:${palette.red[8]};
`;
const StyleImage = styled.img`
margin:0 auto;
width:300px;
height:300px;
`;
const StyledCard = styled(Card)`
margin-top:20px;
`;
const PaginationContainer = styled(Pagination)`
margin-top:20px;
`;

const ProductPage = () => {

  const [products, setProducts] = useState("");
  const [pageNum , setPageNum] = useState(1)
 
  useEffect(() => {
    Axios(
      `${CORS_ANYWHERE}http://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=${API_KEY_SHOP}&apiCode=ProductSearch&keyword=리그오브레전드피규어&pageNum=${pageNum}&pageSize=20`
    ).then(res => {
      const jsonObj = parser.parse(res.data);
      console.log(jsonObj);
      setProducts(jsonObj.ProductSearchResponse.Products.Product);
    });
  }, [pageNum]);
  console.log(products);
 
  const onClickPage = (e) =>{
    setPageNum(e.target.text)
  }
  const onClickPrev = () =>{
    setPageNum(pageNum-1)
  }
  const onClickNext = () =>{
    setPageNum(pageNum+1)
  }
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === Number(pageNum)} onClick={onClickPage} >
        {number}
      </Pagination.Item>
    );
  }
  console.log(items)
  return (
    <ProductContainer>
      <HeaderTitle>STORE</HeaderTitle>
      <Row>
        {products &&
          products.map((product, i) => (
            <Col key={product.ProductCode}>
              <StyledCard>
                <StyleImage
                  
                  src={`${product.ProductImage300}`}
                  alt="product"
                />
                <ListGroup className="list-group-flush">
                <ListGroupItem style={{height:"60px" }} >{product.ProductName}</ListGroupItem>
                <ListGroupItem >{product.ProductPrice}원</ListGroupItem>
                <ListGroupItem >배송:{product.Delivery}</ListGroupItem>
                </ListGroup>
              </StyledCard>
              <CartButton>장바구니담기</CartButton>
              <ImmediatelyPurchaseButton>바로구매하기</ImmediatelyPurchaseButton>
            </Col>
          ))}
      </Row>
      <PaginationContainer>
        <Pagination size="lg" > <Pagination.Prev onClick={onClickPrev}/> {items} <Pagination.Next onClick={onClickNext}/> </Pagination>
      </PaginationContainer>
    </ProductContainer>
  );
};

export default ProductPage;
