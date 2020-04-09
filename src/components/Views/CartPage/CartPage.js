import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {Table} from 'react-bootstrap'

const CartPage = () => {
    const [cartProducts,setCartProducts] = useState('')

    useEffect(() =>{
      refresh()
    },[])
    
   const prices = cartProducts && cartProducts.map((product,i) => cartProducts[i].product.ProductPrice)
   const totalSum = prices && Array.from(prices).reduce((acc,cur) => acc+cur)
  
   console.log(cartProducts)

   const onRemoveCartProduct =(product) =>{
    const variables = {
      product,
    };
    axios.post("/api/users/removeCart", variables).then(res =>  {
      try {
        setCartProducts([...res.data.result]);
      } catch (error) {
        console.log(error);
      }
      refresh()
    })
    refresh()
   }

  const refresh = () => {
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
  };


    return (
    <>
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
            <td><img src={`${product.product.ProductImage100}`} alt="ProductImage"/>{product.product.ProductName}</td>
            <td>{product.quantity}</td>
            <td>{product.product.ProductPrice}</td>
            <td>{product.product.Delivery}</td>
            <td>{product.product.Seller}</td>
            <td><button onClick={() =>onRemoveCartProduct(product)}>삭제하기</button></td>
          </tr>
                   )}
        <tr>
          <td>주문금액:{totalSum}원</td>
        </tr>
        </tbody>
      </Table>
      <button>결제하기</button>
    </>
    );
};

export default CartPage;