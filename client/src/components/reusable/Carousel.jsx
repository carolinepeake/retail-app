import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import usePosition from '../utils/usePosition';
import Button from './Button';

function Carousel2({ children, sharedViewport }) {
  const ref = useRef(null);
  // // const position = usePosition(ref);

  const [visible, setVisible] = useState(0);

  // // get # of visible cards
  // const carouselBox = ref.current.getBoundingClientRect();
  // const carouselWidth = carouselBox.width;

  // const cardBox = cardRef.current.clientWidth;
  // // should get gap too

  const {
    hasItemsOnLeft,
    hasItemsOnRight,
    scrollRight,
    scrollLeft,
  } = usePosition(ref);

  // const controls = children.map((item, index) => (
  //   <a
  //     key={index}
  //     href={`#seq${index}`}
  //   >
  //     {item}
  //   </a>
  // ));

  const items = children.map((item, index) => (
    <Slide
      key={index}
      id={`seq${index}`}
      sharedViewport={sharedViewport}
    >
      {item}
    </Slide>
  ));

  return (
    <Container>

      <CarouselContainer
        id="carousel-container"
        role="region"
        aria-label="Colors carousel"
      >
        {/* <CarouselButton
          hasItemsOnLeft={hasItemsOnLeft}
          onClick={scrollLeft}
          aria-label="Previous slide"
          visible={visible}
        >
          &#8592;
        </CarouselButton> */}

        <Carousel
          id="carousel"
          ref={ref}
          length={items.length}
        >
          {items}
        </Carousel>

        {/* <CarouselButton
          hasItemsOnRight={hasItemsOnRight}
          onClick={scrollRight}
          aria-label="Next slide"
          length={items.length}
        >
          &#8594;
        </CarouselButton> */}

      </CarouselContainer>

      <LeftCarouselButton
        hasItemsOnLeft={hasItemsOnLeft}
        onClick={scrollLeft}
        aria-label="Previous slide"
        visible={visible}
      >
        {/* <ArrowLeft> */}
        &#8592;

        {/* </ArrowLeft> */}
      </LeftCarouselButton>

      <RightCarouselButton
        hasItemsOnRight={hasItemsOnRight}
        onClick={scrollRight}
        aria-label="Next slide"
        length={items.length}
      >
        {/* <ArrowRight> */}
        &#8594;
        {/* </ArrowRight> */}
      </RightCarouselButton>

    </Container>
  );
}

const Container = styled.div`
  width: 100$;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  @media (min-width: 600px) {
    display: initial;
    margin: 0;
  };
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-gap: 2em;

  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  overflow-x: scroll;
  --slide-count: ${(props) => props.length};
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  };
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 0;

  @media (max-width: 600px) {
    margin: 0 auto;
  };


`;
// display: block;

const Carousel = styled.ul`

  ${(props) => !props.sharedViewport && css`
    width: ${(props) => `${props.length}00%`};
    width: calc(100% * var(--slide-count));
  `};
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;
  @media (min-width: 600px) {
    transition: translate 0.5s;
    translate: ${(props) => `calc((-100% / ${props.length}) * ${props.visibleIndex})`};
  };
  margin-left: -1rem;

  @media (max-width 600px) {
    position: relative;
    &::before, after {
      margin-left: calc(100vw /2);
    };
  };

  ${(props) => props.sharedViewport && css`
    width: ${(props) => `${props.length}00%`};
    transition: translate 0.5s;
    translate: ${(props) => `calc((-100% / ${props.length}) * ${props.visibleIndex})`};
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;
    margin-left: -1rem;
    flex-row-gap: 1em;
  `};



`;

const Slide = styled.li`
  ${(props) => props.sharedViewport && css`
    scroll-snap-align: center;
    margin-left: 1rem;
    @media (min-width: 600px) {
      margin-left: 2rem;
    };
    &&:first-of-type {
      margin-left: 1rem;
    };
  `};
  ${(props) => !props.sharedViewport && css`
    scroll-snap-align: start;
    width: 100%;
    height: 100%;
`};
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
  // position: absolute;

const LeftCarouselButton = styled(CarouselButton)`
    left: 1.5em;
    transform: translate(-100%, -50%);
    position: absolute;

    ${CarouselContainer}:hover & {
      transform: translate(0%, -50%);
    };


`;
// visibility: ${(props) => (props.visible > 0 ? 'all' : 'hidden')};

// visibility: ${(props) => (props.hasItemsOnLeft ? 'all' : 'hidden')};

// const LeftCarouselButton = styled(CarouselButton)`
// flex-order: 1;

// ${CarouselContainer}:hover & {
//   visibility: ${({hasItemsOnLeft}) => (hasItemsOnLeft ? `all` : `hidden`)};
// };
// `;

const RightCarouselButton = styled(CarouselButton)`
  right: 1.5em;
  transform: translate(100%, -50%);
  position: absolute;

  ${CarouselContainer}:hover & {
    transform: translate(0%, -50%);
  };

`;
// visibility: ${(props) => (props.visibleEnd < props.length - 1 ? 'all' : 'hidden')};

// visibility: ${({hasItemsOnRight}) => (hasItemsOnRight ? `all` : `hidden`)};

// const RightCarouselButton = styled(CarouselButton)`
//   flex-order: 50;

//   ${CarouselContainer}:hover & {
//     visibility: ${({hasItemsOnRight}) => (hasItemsOnRight ? `all` : `hidden`)};
//   };

// `;

// When clicking arrows:  move so that the the entire row of items is replaced, if possible
// will need to get the width of the bounding rectangle or something similiar
// to see how many items are displayed
// (could also maybe do dynamically with calcualated values)

export default Carousel2;
