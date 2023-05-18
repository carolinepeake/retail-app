import React, { useRef, useState, useLayoutEffect, useEffect} from 'react';
import styled, { css } from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Card from './Card';
import Button from '../../reusable/Button';

function CardsList5() {
  const {
    productList,
  } = useGlobalContext();

  const length = productList.length;

  const viewport = useRef(null);

  const [width, setWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [padding, setPadding] = useState(0);
  const [card, setCard] = useState(0);

  function getCarousel(e) {
    if (viewport.current) {
      const viewportWidth = viewport.current.offsetWidth;
      const numberOfCards = Math.floor(width / 220);
      console.log('numeberOfCards: ', numberOfCards);
      const cardWidthValue = width / numberOfCards;
       console.log('cardWidthValue: ', cardWidthValue);
      const paddingWidth = (width / numberOfCards) / 5;
      const actualCardWidth = cardWidthValue + paddingWidth / numberOfCards;
      setWidth(() => width);
      setCardWidth(() => cardWidthValue);
      setPadding(() => paddingWidth);
      setCard(() => actualCardWidth);
      // const xPercent = `${(x / (containerWidth / 100)) * 1.25}%`;
      // const yPercent = `${(y / (containerHeight / 100)) * 1.25}%`;
      // setXPerc(() => xPercent);
      // setYPerc(() => yPercent);
    }
  }

  useEffect(() => {
    // if (viewport.current) {
      // const viewportWidth = viewport.current.offsetWidth;
      // setWidth(() => viewportWidth);
      // console.log('width: ', width);
      getCarousel();
    // }
  }, [viewport]);

  // useEffect(() => {
  //   getCarousel();
  // }, [width]);

  // useLayoutEffect(() => {
  //   // let offsetWidth;
  //   if (viewport.current) {
  //     const { offsetWidth } = viewport.current;
  //     setWidth(offsetWidth);
  //   }
  //   // setWidth(offsetWidth);
  // }, []);

  // console.log('viewport: ', viewport);

  // let width;
  // let numberOfCards;
  // let cardWidth;
  // let paddingWidth;
  // // let totalMargin;
  // let actualCardWidth;
  // let innerWidth;

  // useEffect(() => {

    // if (viewport.current) {
    //   // console.log('viewport: ', viewport.current);
    //   // width = viewport.current.offsetWidth;
    //   numberOfCards = Math.floor(width / 220);
    //   console.log('numeberOfCards: ', numberOfCards);
    //   cardWidth = width / numberOfCards;
    //   paddingWidth = (width / numberOfCards) / 5;
    //   actualCardWidth = cardWidth + paddingWidth / numberOfCards;
    //   // innerWidth = width;
    //   // marginWidth = (width / numberOfCards) / 5;
    //   // totalMargin = marginWidth * (numberOfCards - 1);
    //   // cardWidth = (width - totalMargin) / numberOfCards;
    //   // console.log('cardWidth: ', cardWidth);
    // }

  // }, [viewport]);

  const [translate, setTranslate] = useState(0);

  // useEffect(() => {
  //   setTranslate(paddingWidth);
  // }, [paddingWidth]);

  function handlePrev() {
    setTranslate(0);
  }

  function handleNext() {
    setTranslate(width + padding);
  }

  return (
    length > 0 && (

      <Container ref={viewport}>

      <CarouselContainer width={width} padding={padding} cardWidth={cardWidth}>

        <CarouselInner width={width}>

        <CarouselContent className="carousel-content" translate={translate} card={card}>

          {productList.map((slide, index) => (
            <CardContainer className="carousel-item" width={width} card={card} index={index}>
              <Card className="carousel-card" data={slide} key={index} index={index} cardWidth={cardWidth} card={card}/>
            </CardContainer>
          ))}

        </CarouselContent>

        <CarouselButton style={{ left: 0 }} onClick={(e) => handlePrev(e)}>
          &#8592;
        </CarouselButton>
        <CarouselButton style={{ right: 0 }} onClick={(e) => handleNext(e)}>
          &#8594;
        </CarouselButton>

        </CarouselInner>

      </CarouselContainer>

      </Container>
    )
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const CarouselContainer = styled.div`
  position: relative;
  display: block;
  width: ${(props) => props.width + props.padding}px;
  height: 100%;

  .carousel-content {
    padding-right: ${(props) => (props.cardWidth / 5)}px;
  };
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
  display: flex;
  transition: transform 0.5s;
  transform: translateX(-${(props) => props.translate}px);
  height: 432px;
  .carousel-item {
    padding-right: ${(props) => (props.cardWidth / 5)}px;
  };

`;
// &&:nth-child(${(props) => props.numberOfCards}n) {
//   padding-right: 0;
// };

const CardContainer = styled.div`
  box-sizing: border-box;
  width: ${(props) => props.card}px;
  height: 100%;
`;
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

export default CardsList5;
