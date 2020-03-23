import React, { useState, useEffect } from "react";
import { Button, Card, Row,Col , Pagination} from "react-bootstrap";
import Axios from "axios";
const parser = require("fast-xml-parser");

const ProductPage = () => {
  
  const [products, setProducts] = useState("");
  useEffect(() => {
    Axios(
      "https://cors-anywhere.herokuapp.com/http://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=fc559c28fcef7aac74de4e9fe5a8897a&apiCode=ProductSearch&keyword=리그오브레전드피규어&pageNum=1"
    ).then(res => {
      const jsonObj = parser.parse(res.data);
      console.log(jsonObj);
      setProducts(jsonObj.ProductSearchResponse.Products.Product);
    });
  }, []);
  console.log(products);
  return (
    <div>
      <Row >
      {products &&
        products.map((product, i) => (
          
            <Col >
              <Card>
                <img
                  width="300px"
                  height="300px"
                  src={`${product.ProductImage300}`}
                  alt=""
                />
                <div style={{ color: "red" }}>{product.ProductName}</div>
                <div style={{ color: "red" }}>{product.ProductPrice}원</div>
                <div style={{ color: "red" }}>{product.Delivery}</div>
              </Card>
              <Button>장바구니담기</Button>
              <Button>바로구매하기</Button>
            </Col>
        ))}
        </Row>

        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
    </div>

    
  );
  
};

export default ProductPage;


