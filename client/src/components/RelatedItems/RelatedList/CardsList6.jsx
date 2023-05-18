import React, { useRef, useState, useLayoutEffect, useEffect} from 'react';
import styled, { css } from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Card from './Card';
import Button from '../../reusable/Button';

function CardsList6() {
  const {
    productList,
  } = useGlobalContext();

  const length = productList.length;

  const viewport = useRef(null);

  const [translate, setTranslate] = useState(0);

  function handlePrev() {
    setTranslate(0);
  }

  function handleNext() {
    setTranslate(width + padding);
  }

  return (
    length > 0 && (

      <Container ref={viewport}>

      <CarouselContainer>

        {/* <CarouselInner > */}

        {/* <CarouselContent className="carousel-content" translate={translate} productList={productList} > */}

          {productList.map((slide, index) => (
            <CardContainer className="carousel-item" index={index} key={index}>
              <Card className="carousel-card" data={slide} key={index} index={index} />
            </CardContainer>
          ))}

        {/* </CarouselContent> */}

        <CarouselButton style={{ left: 0 }} onClick={(e) => handlePrev(e)}>
          &#8592;
        </CarouselButton>
        <CarouselButton style={{ right: 0 }} onClick={(e) => handleNext(e)}>
          &#8594;
        </CarouselButton>

        {/* </CarouselInner> */}

      </CarouselContainer>

      </Container>
    )
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, minmax(220px, 1fr));
  grid-template-rows: 1fr;
  grid-auto-flow: column;
`;
// grid-template-columns: repeat(minmax(220px, 1fr);
// grid-auto-flow: column;


const CarouselContainer = styled.div`
  position: relative;
  display: block;
  width: 100%
  height: 100%;
  grid-columns: 1 / span 3;
  display: contents;
  overflow: hidden;
`;
// width: 600px;
// width: 100%;

const CarouselInner = styled.div`
  overflow: hidden;
  width: ${(props) => props.width}px;
  position: relative;
`;
// left: -${(props) => props.translate}px;

const CarouselContent = styled.div`
  height: 432px;
`;
// width: ${(props) => props.productList.length * 100}00%;
// transition: transform 0.5s;
// transform: translateX(-${(props) => props.translate}px);
// &&:nth-child(${(props) => props.numberOfCards}n) {
//   padding-right: 0;
// };

const CardContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 220px;
`;
// width: ${(props) => props.card}px;
// width: ${(props) => props.cardWidth}px;
// &&:nth-child(n) {
//   ${(props) => (((props.index + 1) % props.numberOfCards === 0) && css`
//     padding-right: 0;
//     width: ${props.actualCardWidth - (props.cardWidth / 5)}px;
//   `)};


// .carousel-card {
//   padding-right: ${(props) => (props.cardWidth / 5)}px;
// };


//   };
// width: 300px;
// padding-right: 1em;
// padding-right: ${(props) => (props.cardWidth / 5)}px;

const CarouselButton = styled(Button)`
  position: absolute;
  cursor: pointer;
  top: 50%;
  z-index: 7;
  transition: transform 0.1s ease-in-out;
  background: white;
  border: none;
  font-size: 1.5em;
  width: 1.5em;
  height: 1.5em;
  transform: translateY(-50%);
  padding: 0;
  margin: 0;
`;
// padding: 0.5rem;

export default CardsList6;
