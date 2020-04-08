import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {Table} from 'react-bootstrap'

const CartPage = () => {
    const [cartProducts,setCartProducts] = useState('')

    useEffect(() =>{
        axios
        .post("/api/users/cart", {
          userFrom: localStorage.getItem("userId")
        })
        .then(res => {
          try {
            setCartProducts(res.data.doc[0].cart);
          } catch (error) {
            console.log(error);
          }
        });
    },[])
   const prices = cartProducts && cartProducts.map((product,i) => cartProducts[i].product.ProductPrice)
   const totalSum = prices && Array.from(prices).reduce((acc,cur) => acc+cur)
  
   console.log(cartProducts)

    return (
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>상품/옵션정보</th>
            <th>수량</th>
            <th>가격</th>
            <th>배송비</th>
            <th>판매자</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts && cartProducts.map((product,i) =>
          <tr key={product.date}>
            <td><img src={`${product.product.ProductImage100}`} alt=""/>{product.product.ProductName}</td>
            <td>{product.quantity}</td>
            <td>{product.product.ProductPrice}</td>
            <td>{product.product.Delivery}</td>
            <td>{product.product.Seller}</td>
          </tr>
                   )}
        <tr>
          <td>주문금액:{totalSum}원</td>
        </tr>
        </tbody>
      </Table>
    );
};

export default CartPage;