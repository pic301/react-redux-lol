import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useSelector,useDispatch } from 'react-redux'
import { getFavorite } from '../../../../actions/user_actions'
import { ADD_FAVORITE,REMOVE_FAVORITE } from '../../../../actions/types'
import styled from 'styled-components'
import {palette} from '../../../../lib/styles/palette'

const StyledHeartIcon = styled(FaHeart)`
   color:${props => props.myFavorited || "black"};
   font-size:1.5rem;
   margin:10px;
`;
const MyFavoritedButtonContainer = styled.div`
   & > button{
     padding:10px;
   }
`;

const Favorite = ({ championId, userFrom }) => {
  const dispatch = useDispatch();
  const { myFavorited } = useSelector(state =>state.favorite)
  const [favoriteNumber, setFavoriteNumber] = useState(0);

  let variables = {
    userFrom: userFrom,
    championId: championId
  };

  useEffect(() => {
   
    axios
      .post("/api/favorite/favoriteNumber", variables)
      .then(res => setFavoriteNumber(res.data.favoriteNumber));
      dispatch(getFavorite(variables))
    // axios
    //   .post("/api/favorite/myFavorited", variables)
    //   .then(res => setMyFavorited(res.data.myFavorited));
  }, [dispatch]);
  const onClickFavorite = () =>{
      if(myFavorited){
        axios
      .post("/api/favorite/removeFavorite", variables)
      .then(res => {
        if(res.data.success){
          setFavoriteNumber(favoriteNumber-1)
          dispatch({
            type:REMOVE_FAVORITE,
            myFavorited:myFavorited
          })
          
        }else{
          alert('좋아요 취소하는데 실패하셨습니다.')
        }
      });
      } else{
        axios
      .post("/api/favorite/addFavorite", variables)
      .then(res => {
        if(res.data.success){
          setFavoriteNumber(favoriteNumber+1)
          dispatch({
            type:ADD_FAVORITE,
            myFavorited:myFavorited
          })
        }else{
          alert('좋아요 취소하는데 실패하셨습니다.')
        }
      });
      }
  }
 
  return (
    <div>
      <div>
        {myFavorited ? (
          <>
            <MyFavoritedButtonContainer>
            <StyledHeartIcon myFavorited={`${palette.red[6]}`} />
            <button  onClick={onClickFavorite}>좋아요{favoriteNumber}</button>
            </MyFavoritedButtonContainer>
          </>
        ) : (
          <>
          <MyFavoritedButtonContainer>
            <StyledHeartIcon />
            <button onClick={onClickFavorite}>좋아요{favoriteNumber}</button>
         </MyFavoritedButtonContainer>
         </>
        )}
      </div>
    </div>
  );
};
export default Favorite;
