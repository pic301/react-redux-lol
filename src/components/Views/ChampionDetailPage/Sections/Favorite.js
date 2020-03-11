import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const Favorite = ({ championId, userFrom }) => {
  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [myFavorited, setMyFavorited] = useState(false);

  let variables = {
    userFrom: userFrom,
    championId: championId
  };

  useEffect(() => {
   
    axios
      .post("/api/favorite/favoriteNumber", variables)
      .then(res => setFavoriteNumber(res.data.favoriteNumber));

    axios
      .post("/api/favorite/myFavorited", variables)
      .then(res => setMyFavorited(res.data.myFavorited));
  }, []);
  const onClickFavorite = () =>{
      if(myFavorited){
        axios
      .post("/api/favorite/removeFavorite", variables)
      .then(res => {
        if(res.data.success){
          setFavoriteNumber(favoriteNumber-1)
          setMyFavorited(!myFavorited)
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
          setMyFavorited(!myFavorited)
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
            <FaHeart style={{color:"red"}}/>
            <button onClick={onClickFavorite}>좋아요{favoriteNumber}</button>
          </>
      
        ) : (
          <>
            <FaHeart style={{color:"black"}} />
            <button onClick={onClickFavorite}>좋아요{favoriteNumber}</button>
         </>
        )}
      </div>
    </div>
  );
};
export default Favorite;
