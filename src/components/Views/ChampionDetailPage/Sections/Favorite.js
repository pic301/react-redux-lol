import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

const Favorite = ({ championId, userFrom }) => {
  const [favorite, setFavorite] = useState(0);
  const [myFavorited, setMyFavorited] = useState(false);

  useEffect(() => {
    let variables = {
      userFrom: userFrom,
      championId: championId
    };
    axios
      .post("/api/favorite/favoriteNumber", variables)
      .then(res => setFavorite(res.data.favoriteNumber));

    axios
      .post("/api/favorite/myFavorited", variables)
      .then(res => setMyFavorited(res.data.myFavorited));
  }, []);

  return (
    <div>
      <div>
        {Favorite ? (
          <FaHeart>
            <button></button>
          </FaHeart>
        ) : (
          <FaHeart style={{ color: "red" }}>
            <button></button>
          </FaHeart>
        )}
      </div>
    </div>
  );
};
export default Favorite;
