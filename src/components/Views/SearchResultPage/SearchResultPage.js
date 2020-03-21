import React, { useState,useEffect } from 'react';
import {API_KEY}  from '../../config';
import Axios from 'axios'


const SearchResultPage = ({match}) => {
    const summonName = match.params.summonerName
    const [summonerId,setSummonerId] = useState('')
  
    useEffect(() =>{
          Axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonName}?api_key=${API_KEY}`)
    .then(res =>
        setSummonerId(res.data.id)
      )
     
    },[])
   
    Axios.get(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=RGAPI-57a5c276-def0-48e1-8460-d8367b8a9278`)
    .then(res => console.log("dsfsdf",res))

    return (
      <div>
        
      </div>
    );
};

export default SearchResultPage;