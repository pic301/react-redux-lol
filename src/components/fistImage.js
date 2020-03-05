import React from 'react';
import fireWater2 from '../images/fire-and-water-2354583_1920.jpg'
import fireWater from '../images/comic-2770256_1920.jpg'
import fireWater3 from '../images/fist-2526897_1280.jpg'
import styled from 'styled-components'

import Carousel from 'react-bootstrap/Carousel'


const StyledImage = styled.img`
    width: 800px;
    height: 400px;
`;

const FistImage = () => {
    return (
        <Carousel controls={false} indicators={false} interval={1000} fade={true}>
        <Carousel.Item>
          <StyledImage
            className="d-block w-100"
            src={fireWater}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <StyledImage
            className="d-block w-100"
            src={fireWater2}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <StyledImage
            className="d-block w-100"
            src={fireWater3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    );
};

export default FistImage;