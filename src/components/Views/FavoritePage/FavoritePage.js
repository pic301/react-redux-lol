import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import axios from "axios";

const FavoritePage = () => {
  const [getMyFavorites, setGetMyFavorites] = useState([]);

  useEffect(() => {
    axios
      .post("/api/favorite/getFavoritedChampion", {
        userFrom: localStorage.getItem("userId")
      })
      .then(res => {
        try {
        
          setGetMyFavorites(res.data.favorites);
        } catch (error) {
          console.log(error);
        }
      });
  }, []);

  return (

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>챔피언 이름</th>
        </tr>
      </thead>
      {Object.keys(getMyFavorites).map((key,i )=>
      <tbody key={key}>
      <tr>
        <td>{i}</td>
        <td>{getMyFavorites[key].championId}</td>
      </tr>
    </tbody>  
      )}
    </Table>
  );
};

export default FavoritePage;
