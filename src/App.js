import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Row , Col, Container } from 'react-bootstrap';


const App = () => {
  const [champion ,setChampion] = useState('')

 useEffect(()=>{
  axios.get('http://ddragon.leagueoflegends.com/cdn/10.4.1/data/ko_KR/champion.json')
  .then(res => 
      setChampion(res.data.data)
    ).catch(err => console.log(err))
 },[])
    console.log(champion)

  const realChampion = Object.keys(champion).map((cham) => champion[cham])
  console.log(realChampion)
  return (
    <Container>
        <Row>
          {realChampion.map(cham => 
             <Col xs={4} md={2}>
             <img src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/champion/${cham.image.full}`} alt=""/>
             <p>{cham.name}</p>
             </Col>
          )}
      </Row>
    </Container>
   
   
  );
};

export default App;