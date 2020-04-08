import React, { useEffect, useState } from 'react';
import axios from 'axios'

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
    console.log(cartProducts)
    return (
        <div style={{color:'red'}}>
          {cartProducts&& cartProducts.map((product,i) =><div>{product.id}</div>) }
        </div>
    );
};

export default CartPage;