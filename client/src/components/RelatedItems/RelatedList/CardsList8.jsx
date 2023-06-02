import React, {
  useRef, useState, useLayoutEffect, useEffect,
} from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Card from './Card';
import Button from '../../reusable/Button';

function CardsList8() {
  const {
    productList,
  } = useGlobalContext();

  // const { length } = productList;

  // const viewport = useRef(null);
  // const carousel = useRef(null);

  // let viewportWidth;
  // if (viewport.current) {
  //   viewportWidth = viewport.current.offsetWidth;
  // }

  // let carouselWidth;
  // if (carousel.current) {
  //   carouselWidth1 = carousel.current.offsetWidth;
  // }
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

  // let index = 0;
  // let translate = 0;

  const [hidePrev, setHidePrev] = useState(true);
  const [hideNext, setHideNext] = useState(false);

  function handlePrev() {
    setHideNext(false);
    // const transform = `calc(-${(index - 1) * viewportWidth}px - 1em)`;
    const transform = -100 / productList.length;
    setTranslate(transform);
    if (index === 1) {
      setHidePrev(true);
    }
    setIndex((prev) => prev - 1);
    console.log('index: ', index);
    console.log('translate: ', translate);
    // index--;
  }

  function handleNext() {
    setHidePrev(false);
    // const transform = `calc(-${(index + 1) * viewportWidth}px - 1em)`;
    const transform = -100 / productList.length;
    // const transform = `calc(-100% / ${productList.length} * ${index})`;
    setTranslate(transform);
    // console.log('carouselWidth: ', carouselWidth, 'index plus 1: ', index + 1, 'viewportWidth: ', viewportWidth);
    // if (carouselWidth - ((index + 1) * viewportWidth) < viewportWidth) {
    //   console.log('hiding next button');
    //   setHideNext(true);
    // }
    setIndex((prev) => prev + 1);
    console.log('index: ', index);
    console.log('translate: ', translate);
    // index++
  }

  // move padding to the left and make initial transform width of padding
  // make width of item the viewportWidth / number of elements want showing (use media queries)
  // add resize event listener

  return (

    <CarouselContainer>

      <CarouselContent
              // ref={carousel}
        translate={translate}
        length={productList.length}
        index={index}
      >

        {productList.map((slide, i) => (
          <CardContainer
            className="carousel-item"
            index={index}
            key={i}
            length={productList.length}
          >
            <Card className="carousel-card" data={slide} index={index} />
          </CardContainer>
        ))}

      </CarouselContent>

      <LeftButton onClick={(e) => handlePrev(e)} hidePrev={hidePrev}>
        &#8592;
      </LeftButton>
      <RightButton onClick={(e) => handleNext(e)} hideNext={hideNext} length={productList.length} index={index}>
        &#8594;
      </RightButton>

    </CarouselContainer>

  );
}

const CarouselContainer = styled.div`
  position: relative;
  display: block;
  padding-left: 2.5%;
  margin-right: 5%;
  overflow: hidden;
  @media (min-width: 900px) {
    margin-left: 2.5%;
    padding-left: 1.25%;
  }
`;

const CarouselContent = styled.div`
  transition: transform 0.4s;
  position: relative;
  display: flex;
  transform: ${(props) => ((props.length - (1 * props.index) < 1) ? `translateX(calc(${props.translate}% * ${props.index - 1} * 1 + (${props.translate}% * (${props.length % 1}))))` : `translateX(calc(${props.translate}% * ${props.index} * 1))`)};
  width: calc((100% + 2.5vw) / 1 * ${(props) => props.length});

  @media (min-width: 21.875em) {
    transform: ${(props) => ((props.length - (2 * props.index) < 2) ? `translateX(calc(${props.translate}% * ${props.index - 1} * 2 + (${props.translate}% * (${props.length % 2}))))` : `translateX(calc(${props.translate}% * ${props.index} * 2))`)};
    width: calc((100% + 2.5vw) / 2 * ${(props) => props.length});
  }
  @media (min-width: 37.5em) {
    transform: ${(props) => ((props.length - (3 * props.index) < 3) ? `translateX(calc(${props.translate}% * ${props.index - 1} * 3 + (${props.translate}% * (${props.length % 3}))))` : `translateX(calc(${props.translate}% * ${props.index} * 3))`)};
    width: calc((100% + 2.5vw) / 3 * ${(props) => props.length});
  }
  @media (min-width: 900px) {
    transform: ${(props) => ((props.length - (4 * props.index) < 4) ? `translateX(calc(${props.translate}% * ${props.index - 1} * 4 + (${props.translate}% * (${props.length % 4}))))` : `translateX(calc(${props.translate}% * ${props.index} * 4))`)};
    width: calc((100% + 1.25vw) / 4 * ${(props) => props.length});
  }
  @media (min-width: 1300px) {
    transform: ${(props) => ((props.length - (5 * props.index) < 5) ? `translateX(calc(${props.translate}% * ${props.index - 1} * 5 + (${props.translate}% * (${props.length % 5}))))` : `translateX(calc(${props.translate}% * ${props.index} * 5))`)};
    width: calc((100% + 1.25vw) / 5 * ${(props) => props.length});
  }
  @media (min-width: 1650px) {
    transform: ${(props) => ((props.length - (6 * props.index) < 6) ? `translateX(calc(${props.translate}% * ${props.index - 1} * 6 + (${props.translate}% * (${props.length % 6}))))` : `translateX(calc(${props.translate}% * ${props.index} * 6))`)};
    width: calc((100% + 1.25vw) / 6 * ${(props) => props.length});
  }
  @media (min-width: 2000px) {
    transform: ${(props) => ((props.length - (7 * props.index) < 7) ? `translateX(calc(${props.translate}% * ${props.index - 1} * 7 + (${props.translate}% * (${props.length % 7}))))` : `translateX(calc(${props.translate}% * ${props.index} * 7))`)};
    width: calc((100% + 1.25vw) / 7 * ${(props) => props.length});
  }
  @media (min-width: 2350px) {
    transform: ${(props) => ((props.length - (8 * props.index) < 8) ? `translateX(calc(${props.translate}% * ${props.index - 1} * 8 + (${props.translate}% * (${props.length % 8}))))` : `translateX(calc(${props.translate}% * ${props.index} * 8))`)};
    width: calc((100% + 1.25vw) / 8 * ${(props) => props.length});
  }
  @media (min-width: 2700px) {
    transform: ${(props) => ((props.length - (9 * props.index) < 9) ? `translateX(calc(${props.translate}% * ${props.index - 1} * 9 + (${props.translate}% * (${props.length % 9}))))` : `translateX(calc(${props.translate}% * ${props.index} * 9))`)};
    width: calc((100% + 1.25vw) / 9 * ${(props) => props.length});
  }
`;

// TO-DO: implement scroll for mobile
const CardContainer = styled.div`
  margin: 0;
  width: calc(100% / ${(props) => props.length});
  padding-right: 2.5vw;
  padding-left: 2.5vw;
  box-sizing: border-box;
  height: 100%;
  aspect-ratio: 4/6;
  @media (min-width: 900px) {
    padding-right: 1.25vw;
    padding-left: 1.25vw;
  }
`;
// @media (min-width: 400px) {
//   width: 45vw;
//   padding-left: 1em;
// }
// @media (min-width: 600px) {
//   width: 30vw;
// }
// @media (min-width: 800px) {
//   width: 22.5vw;
// }
// @meida (min-width: 1000px) {
//   width: 18vw;
// }
// @media (min-width: 1200px) {
//   width: 15vw;
// }
// padding-left: 2em;
//   width: 220px;
//   flex-shrink: 1;
//   margin: 0 auto;
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

const RightButton = styled(CarouselButton)`
  right: 0;
  display: ${(props) => ((props.hideNext || ((props.index + 1) * 1 >= props.length)) ? 'none' : 'block')};
  @media (min-width: 21.875em) {
    display: ${(props) => ((props.hideNext || ((props.index + 1) * 2 >= props.length)) ? 'none' : 'block')};
  }
  @media (min-width: 37.5em) {
    display: ${(props) => ((props.hideNext || ((props.index + 1) * 3 >= props.length)) ? 'none' : 'block')};
  }
  @media (min-width: 900px) {
    display: ${(props) => ((props.hideNext || ((props.index + 1) * 4 >= props.length)) ? 'none' : 'block')};
  }
  @media (min-width: 1300px) {
    display: ${(props) => ((props.hideNext || ((props.index + 1) * 5 >= props.length)) ? 'none' : 'block')};
  }
  @media (min-width: 1650px) {
    display: ${(props) => ((props.hideNext || ((props.index + 1) * 6 >= props.length)) ? 'none' : 'block')};
  }
  @media (min-width: 2000px) {
    display: ${(props) => ((props.hideNext || ((props.index + 1) * 7 >= props.length)) ? 'none' : 'block')};
  }
  @media (min-width: 2350px) {
    display: ${(props) => ((props.hideNext || ((props.index + 1) * 8 >= props.length)) ? 'none' : 'block')};
  }
  @media (min-width: 2700px) {
    display: ${(props) => ((props.hideNext || ((props.index + 1) * 9 >= props.length)) ? 'none' : 'block')};
  }
`;

const LeftButton = styled(CarouselButton)`
  left: 5%;
  display: ${(props) => (props.hidePrev ? 'none' : 'block')};
  @media (min-width: 900px) {
    left: 2.5%;
  };
`;

export default CardsList8;
