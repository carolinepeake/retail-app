import React, {
  useRef, useState, useLayoutEffect, useEffect,
} from 'react';
import styled, { css } from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Card from './Card';
import Button from '../../reusable/Button';

function CardsList8() {
  const {
    productList,
  } = useGlobalContext();

  const { length } = productList;

  const viewport = useRef(null);
  const carousel = useRef(null);

  let viewportWidth;
  if (viewport.current) {
    viewportWidth = viewport.current.offsetWidth;
  }

  let carouselWidth;
  if (carousel.current) {
    carouselWidth = carousel.current.offsetWidth;
  }
  // const [viewPortWidth, setViewPortWidth] = useState(viewport.current.offsetWidth);
  // const [carouselWidth, setCarouselWidth] = useState(carousel.current.offsetWidth);

  // const [viewportWidth, setViewportWidth] = useState(0);
  // const [carouselWidth, setCarouselWidth] = useState(0);
  const [translate, setTranslate] = useState(0);

  // useEffect(() => {
  //   const resizeListener = () => {
  //     if (viewport.current) {
  //       setViewportWidth(viewport.current.offsetWidth);
  //       console.log('viewportWidth: ', viewportWidth);
  //     }
  //     if (carousel.current) {
  //       setCarouselWidth(carousel.current.offsetWidth);
  //       console.log('carouselWidth: ', carouselWidth);
  //     }
  //   };
  //   window.addEventListener('resize', resizeListener);
  //   return () => {
  //     window.removeEventListener('resize', resizeListener);
  //   };
  // }, []);

  const [index, setIndex] = useState(0);

  const [hidePrev, setHidePrev] = useState(true);
  const [hideNext, setHideNext] = useState(false);

  function handlePrev() {
    setHideNext(false);
    const transform = `calc(-${(index - 1) * viewportWidth}px - 1em)`;
    setTranslate(transform);
    console.log('index - 1: ', index - 1);
    if ((index - 1) === 0) {
      setHidePrev(true);
    }
    setIndex((prev) => prev - 1);
  }

  function handleNext() {
    setHidePrev(false);
    const transform = `calc(-${(index + 1) * viewportWidth}px - 1em)`;
    setTranslate(transform);
    console.log('carouselWidth: ', carouselWidth, 'index plus 1: ', index + 1, 'viewportWidth: ', viewportWidth);
    if (carouselWidth - ((index + 1) * viewportWidth) < viewportWidth) {
      console.log('hiding next button');
      setHideNext(true);
    }
    setIndex((prev) => prev + 1);
  }

  // move padding to the left and make initial transform width of padding
  // make width of item the viewportWidth / number of elements want showing (use media queries)
  // add resize event listener



  return (
    length > 0 && (

      <CarouselContainer ref={viewport}>

        <CarouselInner>

          <CarouselContent ref={carousel} translate={translate}>

            {productList.map((slide, index) => (
              <CardContainer className="carousel-item" index={index} key={index} viewportWidth={viewportWidth}>
                <Card className="carousel-card" data={slide} key={index} index={index} />
              </CardContainer>
            ))}

          </CarouselContent>

          <LeftButton onClick={(e) => handlePrev(e)} hidePrev={hidePrev}>
            &#8592;
          </LeftButton>
          <RightButton onClick={(e) => handleNext(e)} hideNext={hideNext}>
            &#8594;
          </RightButton>

        </CarouselInner>

      </CarouselContainer>
    )
  );
}

const CarouselContainer = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
`;

const CarouselInner = styled.div`
  overflow: hidden;
`;
// left: -${(props) => props.translate}px;

const CarouselContent = styled.div`
  display: inline-flex;
  transition: transform 0.5s;
  position: relative;
  transform: translateX(${(props) => props.translate});
  .carousel-item {
    padding-right: ${(props) => (props.cardWidth / 5)}px;
  };
`;
 // left: -1em;

// @media (min-width: 400px) {
//   left: 0;
// }
// translateX(-1em);
// &&:nth-child(${(props) => props.numberOfCards}n) {
//   padding-right: 0;
// };

// TO-DO: implement scroll for mobile
const CardContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding-left: 2em;
  width: 220px;
  flex-shrink: 1;
  margin: 0 auto;
  @media (min-width: 400px) {
    width: 45vw;
    padding-left: 1em;
  }
  @media (min-width: 600px) {
    width: 30vw;
  }
  @media (min-width: 800px) {
    width: 22.5vw;
  }
  @meida (min-width: 1000px) {
    width: 18vw;
  }
  @media (min-width: 1200px) {
    width: 15vw;
  }
`;
// &&:first-child {
//   padding-left: 0;
// }
// padding-left: 1em;
// width: 220px;
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

const RightButton = styled(CarouselButton)`
  display: ${(props) => (props.hideNext ? 'none' : 'block')};
  right: 0;
`;

const LeftButton = styled(CarouselButton)`
  left: 0;
  display: ${(props) => (props.hidePrev ? 'none' : 'block')};
`;

export default CardsList8;
