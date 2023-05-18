/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  HiArrowSmDown, HiArrowSmUp, HiArrowSmLeft, HiArrowSmRight,
} from 'react-icons/hi';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Card from './Card';

function CardsList4() {
  const {
    productID, cardIndex, setCardIndex, productList, setProductList, setCurrOutfit,
  } = useGlobalContext();

  const [scrollNum, setScrollNum] = useState(0);
  const [left, setLeft] = useState(0);

  // let left = 0;

  // // TO-DO: dynamically calculate # of visible items
  // // TO-DO: make it so can keep scrolling
  // function calculateLeft() {
  //   if (productList.length > 6) {
  //     left = -100;
  //   } else {
  //     left = -100 / 3;
  //   }
  //   return left;
  // }

  // items left to view is more than visible items, left 100%
  // otherwise left 100/ number of items %

  function clickRight() {
    if (cardIndex + 3 < productList.length) {
      setCardIndex(cardIndex + 1);
    }
    if (productList.length > 6) {
      setLeft(-100);
    } else {
      setLeft(-100 / 3);
    }
    setScrollNum((prev) => prev + 1);
  }

  // make transition smooth, so looks like a smooth carousel
  function clickLeft() {
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1);
    }
    if (productList.length > 6) {
      setLeft(0);
    } else {
      setLeft(0);
      // setLeft(-100 / 3);
    }
  }

  return (
    <Container>
      {cardIndex !== 0 && productList.length >= 4
          && (
          <LeftButton onClick={() => clickLeft()}>
            <HiArrowSmLeft />
          </LeftButton>
          )}

      <CarouselViewport
        id="carousel-container"
        length={productList.length}
        // onScroll={(e) => scrollHandler(e)}
      >

        <StyleCardList left={left} length={productList.length}>

          {(productList.slice(cardIndex, cardIndex + 4)).map((data, i) => <Card data={data} key={i} i={i} />)}

          {productList.length === 0
            && <Text>No related items</Text>}

        </StyleCardList>

      </CarouselViewport>

      {(cardIndex !== productList.length - 3 && productList.length >= 4)
          && (
          <RightButton onClick={() => clickRight()}>
            <HiArrowSmRight />
          </RightButton>
          )}

    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  display: block;
  position: relative;
  overflow: hidden;
`;

const CarouselViewport = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  overflow: hidden;
  position: relative;
  --slide-count: ${(props) => props.length};
`;

// items length is more than visible items, left 100%
// otherwise left 100/ number of items %

const StyleCardList = styled.div`
  display: flex;
  width: 125%;
  position: relative;
  translate: ${(props) => `${props.left}00%`} 0;
  transition: translate 0.5s;
`;
// width: ${(props) => `${props.length}00%`};
// left: ${(props) => `${props.left}00%`};

const Text = styled.div`
  font-size: 2rem;
  font-width: bold;
`;

// TO-DO: combine css for all arrows
const LeftButton = styled.button`
  align-self: center;
  position: absolute;
  font-weight: bold;
  font-size: calc(18px + 0.75vw);
  background-color: transparent;
  border: none;
  &:hover {
    background-color: rgba(114, 114, 114, 0.5);
    color: white;
  };
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
  z-index: 7;
  padding: 0 0;
  height: calc(18px + 0.75vw);
  bottom: 50%;
  left: 0;
`;

const RightButton = styled.button`
  align-self: center;
  position: absolute;
  font-width: bold;
  font-size: calc(18px + 0.75vw);
  background-color: transparent;
  border: none;
  &:hover {
    background-color: rgba(114, 114, 114, 0.5);
    color: white;
  }
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
  z-index: 7;
  right: 0;
  padding: 0 0;
  height: calc(18px + 0.75vw);
  bottom: 50%;
`;

export default CardsList4;
