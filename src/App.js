import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Row , Col, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import CircleImage from './components/circleImage'
import styled from 'styled-components'
import fireWater from './images/fire-and-water-2354583_1920.jpg'

const StyledContainer = styled(Container)`
  margin-Bottom:500px; 
  border:3px solid blue;
  color:#ffffff;
`;

const Wrapper = styled.div`
  display:flex;
  background-color:#292929;
`;
const StyledImage = styled(Image)`
  cursor: pointer;
`;

const baseURL = "http://ddragon.leagueoflegends.com/cdn/10.4.1"

const App = () => {
  const [champion ,setChampion] = useState('')

 useEffect(()=>{
  axios.get(`${baseURL}/data/ko_KR/champion.json`)
  .then(res => 
      setChampion(res.data.data)
    ).catch(err => console.log(err))
    

 },[])
    console.log(champion)

  const realChampion = Object.keys(champion).map((cham) => champion[cham])
  console.log(realChampion)

  const now = 100

  return (
  <div style={{backgroundColor:"#333333"}}>
    <StyledContainer >
    <Image width="100%" height="500px" src={fireWater}></Image>
     <Wrapper >
        <Row >
          {realChampion.map(cham => 
             <Col xs={6} sm={4} md={2} key={cham.key}>
               <OverlayTrigger  placement="bottom"  overlay={<Card style={{ width: '18rem' , padding:"1px"}}>
                <Card.Img variant="top"  src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${cham.id}_0.jpg`} />
                  <Card.Body>
                    <Card.Title >{cham.name}</Card.Title>
                    <Card.Text>
                    {cham.title}
                    </Card.Text>
                    <Card.Text>
                    <ProgressBar variant="success" now={now} label={`${now}%`} />
                    {`HP:${cham.stats.hp}`}
                    {`/MP:${cham.stats.mp}`}
                  </Card.Text>
                </Card.Body>
              </Card>}>
              <StyledImage roundedCircle src={`${baseURL}/img/champion/${cham.image.full}`} alt="champion"/>
              </OverlayTrigger>
               <p style={{textAlign:"center" ,paddingRight:"17px"}}>{cham.name}</p>
             </Col>
          )}
      </Row>
    <CircleImage/>
   </Wrapper>
    </StyledContainer>
 
  </div>

   
  );
};

export default App;
