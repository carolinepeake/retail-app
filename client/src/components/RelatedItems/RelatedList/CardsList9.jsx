import React, {
  useState,
} from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Card from './Card';
import Button from '../../reusable/Button';

function CardsList9() {
  const {
    productList,
  } = useGlobalContext();

  const [index, setIndex] = useState(0);

  const [hidePrev, setHidePrev] = useState(true);
  const [hideNext, setHideNext] = useState(false);

  function handlePrev() {
    setHideNext(false);
    if ((index - 1) === 0) {
      setHidePrev(true);
    }
    setIndex((prev) => prev - 1);
  }

  function handleNext() {
    setHidePrev(false);
    if ((index + 1) * 4 >= productList.length) {
      console.log('hiding next button');
      setHideNext(true);
    }
    setIndex((prev) => prev + 1);
  }

  return (
    productList.length > 0 && (

      <RelatedProductsContainer>

        <CarouselContainer>

          <CarouselContent length={productList.length} index={index}>

            {productList.map((slide, i) => (
              <CardContainer className="carousel-item" index={index} key={i} length={productList.length}>
                <Card className="carousel-card" data={slide} index={index} length={productList.length} />
              </CardContainer>
            ))}

          </CarouselContent>

          <LeftButton onClick={(e) => handlePrev(e)} hidePrev={hidePrev}>
            &#8592;
          </LeftButton>
          <RightButton onClick={(e) => handleNext(e)} hideNext={hideNext}>
            &#8594;
          </RightButton>

        </CarouselContainer>

      </RelatedProductsContainer>
    )
  );
}

const RelatedProductsContainer = styled.div`
  width: 100%;
`;
// position: relative;
// left: -5%;

const CarouselContainer = styled.div`
  position: relative;
  display: block;
  width: 95%;
  height: 100%;
  overflow: hidden;
  left: 2.5%;
  margin-block-left: -7.5%;
`;

const CarouselContent = styled.div`
  display: flex;
  position: relative;
  width: max(100%, calc((100% / 4) * ${(props) => props.length}));
  transform: translateX(calc((-100% / ${(props) => props.length}) * ${(props) => props.index} * 4);
  transition: 0.5s ease;
`;
// transition: transform 0.5s;

const CardContainer = styled.div`
  height: 100%;
  padding-left: 15%;
  border: 1px solid black;
  width: calc(100% / ${(props) => props.length});
`;

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

export default CardsList9;
