import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Card from './Card';
import { useCarousel } from '../../utils/useCarousel';
import Button from '../../reusable/Button';

function CardsList3() {
  const {
    productList,
  } = useGlobalContext();

  const length = productList.length;
  const interval = 500;
  const [active, setActive, setNext, setPrev, style] = useCarousel(length, interval);

  return (
    length > 0 && (
      <Carousel className="carousel" style={{ left: 0 }}>
        <CarouselButton onClick={() => setNext(length, active)}>
          &#8592;
        </CarouselButton>
        <CarouselButton onClick={() => setPrev(length, active)} style={{ right: 0 }}>
          &#8594;
        </CarouselButton>
        {/* <ol className="carousel-indicators">
          {productList.map((_, index) => (
            <li
              onClick={() => setActive(index)}
              key={index}
              className={`${active === index ? 'active' : ''}`}
            />
          ))}
        </ol> */}
        <CarouselContent className="carousel-content"
        // {...handlers}
        style={style}>
          <Card className="carousel-item" data={productList[productList.length - 1]} key={productList.length} i={productList.length} />
          {productList.map((slide, index) => (
            <Card className="carousel-item" data={slide} key={index + 1} i={index + 1} />
          ))}
          <Card className="carousel-item" data={productList[0]} key={0} i={0} />
        </CarouselContent>
      </Carousel>
    )
  );
}

const Carousel = styled.div`
  position: relative;
  display: block;
  width: 100$;
  height: 100%;
`;

const CarouselContent = styled.div`
  position: relative;
  display: flex;
`;

const CarouselButton = styled(Button)`
  position: absolute;
  cursor: pointer;
  top: 50%;
  z-index: 7;
  transition: transform 0.1s ease-in-out;
  background: white;
  border: none;
  padding: 0.5rem;
  font-size: 1.5em;
  width: 1.5em;
  height: 1.5em;
  `;

export default CardsList3;
