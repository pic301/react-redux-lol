import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Table } from 'react-bootstrap'
import styled from 'styled-components'
import Button from '../../common/Button'
import { palette } from '../../../lib/styles/palette'

const TableContainer = styled.div`
    background-color:#ffffff;
    font-size: 1rem;
`;
const StyledTd = styled.td`
    background-color:#ffffff;
    font-size: 2rem;
    font-weight: bold;
    text-align:center;
`;
const PaymentContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
`;
const PaymentButton = styled(Button)`
    background-color:${palette.red[6]};
    &:hover{
      background-color:${palette.red[8]};
    }
    
`;
const CartPage = () => {
    const [cartProducts,setCartProducts] = useState('')

    useEffect(() =>{
      refresh()
    },[])
    
   const prices = cartProducts && cartProducts.map((product,i) => cartProducts[i].product.ProductPrice)
   const totalSum = prices && Array.from(prices).reduce((acc,cur) => acc+cur,0)
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
  const onPayment = () =>{
    alert('아직 준비중입니다.')
  }
    return (
    <TableContainer>
        <Table striped bordered hover  >
        <thead>
          <tr style={{textAlign:"center"}}>
            <th>상품/옵션정보</th>
            <th>수량</th>
            <th>가격</th>
            <th>배송비</th>
            <th>판매자</th>
          </tr>
        </thead>
        <tbody style={{lineHeight:"6"}}>
          {cartProducts && cartProducts.map((product,i) =>
          <tr key={product.date}>
            <td><img src={`${product.product.ProductImage100}`} alt="ProductImage"/>{product.product.ProductName}</td>
            <td>{product.quantity}</td>
            <td>{product.product.ProductPrice}원</td>
            <td>{product.product.Delivery}</td>
            <td>{product.product.Seller}</td>
            <td><Button onClick={() =>onRemoveCartProduct(product)}>삭제하기</Button></td>
          </tr>
          )}
          <PaymentContainer >  
            <StyledTd>
              주문금액:{totalSum}원
            </StyledTd>
            <PaymentButton onClick={onPayment}>결제하기</PaymentButton>
          </PaymentContainer>
        </tbody>
      </Table>
    </TableContainer>
    );
};

export default CartPage;