import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../../config";

const StyledButton = styled(Button)`
  margin: 10px;
`;
const FavoritePage = () => {
  const [getMyFavorites, setGetMyFavorites] = useState([]);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
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
  };
  const onRemove = (championId, userFrom) => {
    const variable = {
      championId,
      userFrom
    };

    axios.post("/api/favorite/removeFavorite", variable).then(res => {
      try {
        setGetMyFavorites([...res.data.result]);
      } catch (error) {
        console.log(error);
      }
      refresh()
    });
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>챔피언 이름</th>
        </tr>
      </thead>
      {Object.keys(getMyFavorites).map((key, i) => (
        <tbody key={key}>
          <tr>
            <td>{i + 1}</td>
            <td>{getMyFavorites[key].championId}</td>
            <img
              src={`${baseURL}/img/champion/${getMyFavorites[key].championId}.png`}
              alt=""
            />
            <StyledButton
              onClick={() =>
                onRemove(
                  getMyFavorites[key].championId,
                  getMyFavorites[key].userFrom
                )
              }
            >
              제거
            </StyledButton>
          </tr>
        </tbody>
      ))}
    </Table>
  );
};

export default FavoritePage;
