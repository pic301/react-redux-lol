import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../../config";
import { useSelector, useDispatch} from 'react-redux';
import {getChampionData} from '../../../actions/champion_actions'
import { FaHeart } from 'react-icons/fa';
import {palette} from '../../../lib/styles/palette'

const StyledButton = styled(Button)`
  margin: 10px;
`;
const FavoritePage = () => {
  const dispatch = useDispatch();
  const {championData} = useSelector(state => state.champion)
  const [getMyFavorites, setGetMyFavorites] = useState([]);
  
  useEffect(() => {
    refresh();
    dispatch(getChampionData())
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
if(championData){
  console.log(Object.values(championData)[0])
}
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>찜목록 <FaHeart style={{color:`${palette.red[9]}`}}/></th>
          <th>챔피언 이름</th>
        </tr>
      </thead>
      {Object.keys(getMyFavorites).map((key, i) => (
        <tbody key={key}>
          <tr>
            <td>{i + 1}</td>
            <td>{getMyFavorites[key].championId}
            </td>
            <td>
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
            </td>
          </tr>
        </tbody>
      ))}
    </Table>
  );
};

export default FavoritePage;
