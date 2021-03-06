import React, { useState, useEffect } from "react";
import { Card,Row,Col,Pagination,ListGroupItem,ListGroup} from "react-bootstrap";
import Axios from "axios";
import { CORS_ANYWHERE, API_KEY_SHOP } from "../../config";
import styled from "styled-components";
import { palette } from "../../../lib/styles/palette";
import Button from "../../common/Button";
  
// ======================================
//               Redux
// ======================================

import { addToCart } from "../../../actions/user_actions";
import { getProducts } from "../../../actions/products_actions";
import { useDispatch,useSelector } from 'react-redux'

const parser = require("fast-xml-parser");

const ProductContainer = styled.div`
  color: ${palette.gray[8]};
`;
const HeaderTitle = styled.div`
  color: ${palette.gray[8]};
  font-size: 4rem;
  text-align: center;
  font-weight: bold;
`;

const ImmediatelyPurchaseButton = styled(Button)`
  background-color: ${palette.red[7]};
  &:hover{
        background:${palette.red[6]};
    }
`;
const StyleImage = styled.img`
  margin: 0 auto;
  width: 300px;
  height: 300px;
`;
const StyledCard = styled(Card)`
  margin-top: 20px;
`;
const PaginationContainer = styled(Pagination)`
  margin-top: 20px;
`;

const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products)
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    Axios(
      `${CORS_ANYWHERE}https://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=${API_KEY_SHOP}&apiCode=ProductSearch&keyword=리그오브레전드피규어&pageNum=${pageNum}&pageSize=20`
    ).then(res => {
      const jsonObj = parser.parse(res.data);
      console.log(jsonObj);
      const products = jsonObj.ProductSearchResponse.Products.Product;
      dispatch(getProducts(products))
    }); 
  }, [pageNum,dispatch]);


  const onClickPage = e => {
    setPageNum(e.target.text);
  };
  const onClickPrev = () => {
    setPageNum(pageNum - 1);
  };
  const onClickNext = () => {
    setPageNum(pageNum + 1);
  };

  const addToCartHandler = product => {
    dispatch(addToCart(product));
  };

  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === Number(pageNum)}
        onClick={onClickPage}
      >
        {number}
      </Pagination.Item>
    );
  }
  console.log(items);
  console.log("상품들",products);
  return (
    <ProductContainer>
      <HeaderTitle>STORE</HeaderTitle>
      <Row>
        {products &&
          products.map((product, i) => (
            <Col key={product.ProductCode}>
              <StyledCard>
                <StyleImage src={`${product.ProductImage300}`} alt="product" />
                <ListGroup className="list-group-flush">
                  <ListGroupItem style={{ height: "60px" }}>
                    {product.ProductName}
                  </ListGroupItem>
                  <ListGroupItem>{product.ProductPrice}원</ListGroupItem>
                  <ListGroupItem>배송:{product.Delivery}</ListGroupItem>
                </ListGroup>
              </StyledCard>
              <Button marginTop onClick={() => addToCartHandler(product)}>
                장바구니담기
              </Button>
              <ImmediatelyPurchaseButton marginTop>
                <a href={product.DetailPageUrl} target="_blank" rel="noopener noreferrer">바로구매하기</a>
              </ImmediatelyPurchaseButton>
            </Col>
          ))}
      </Row>
      <PaginationContainer>
        <Pagination size="lg">
          {" "}
          <Pagination.Prev onClick={onClickPrev} /> {items}{" "}
          <Pagination.Next onClick={onClickNext} />{" "}
        </Pagination>
      </PaginationContainer>
    </ProductContainer>
  );
};

export default ProductPage;
