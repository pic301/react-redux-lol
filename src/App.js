import React, {useState, useEffect} from 'react';
import axios from 'axios';


const App = () => {
  const [champion ,setChampion] = useState('')

 useEffect(()=>{
  axios.get('http://ddragon.leagueoflegends.com/cdn/10.4.1/data/ko_KR/champion.json')
  .then(res => 
      setChampion(res.data.data)
    )
    
 },[])
    console.log(champion)

  const realChampion = Object.keys(champion).map((cham) => champion[cham])
  console.log("진짜", realChampion)
  return (
    <div>
     {realChampion.map(cham => <div>
      <img src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/champion/${cham.image.full}`} alt=""/>
      <p>{cham.name}</p>
     </div>)}
    </div>
  );
};

export default App;