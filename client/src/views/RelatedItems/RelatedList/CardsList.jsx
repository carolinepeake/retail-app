import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
// import { useGlobalContext } from '../../../contexts/GlobalStore';
import Card from './Card';
import ComparisonModal from './ComparisonModal';

function CardsList({
  productList,
}) {
  console.log('[CardsList] is running');

  const [translate, setTranslate] = useState(0);
  const [index, setIndex] = useState(0);

  const [hidePrev, setHidePrev] = useState(true);
  const [hideNext, setHideNext] = useState(false);

  const handlePrev = () => {
    setHideNext(false);
    const transform = -100 / productList.length;
    setTranslate(transform);
    if (index === 1) {
      setHidePrev(true);
    }
    setIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setHidePrev(false);
    const transform = -100 / productList.length;
    setTranslate(transform);
    setIndex((prev) => prev + 1);
  };

  const [modal, setModal] = useState(null);

  const closeModal = useCallback(() => {
    setModal(null);
  }, [setModal]);

  const handleBackgroundClick = (event) => {
    if (event.target.id === 'CompareProductsBackground') {
      closeModal();
    }
    event.stopPropagation();
  };

  return (
    <>
      <CarouselContainer>

        <CarouselContent
          translate={translate}
          length={productList.length}
          index={index}
        >

          {productList.map((product, i) => (
            <CardContainer
              key={product.productID}
              length={productList.length}
            >
              <Card
                product={product}
                setTranslate={setTranslate}
                setIndex={setIndex}
                onClickRightButton={setModal}
                i={i}
                icon="star"
              />
            </CardContainer>
          ))}

        </CarouselContent>

        <LeftButton
          onClick={handlePrev}
          hidePrev={hidePrev}
        >
          <ArrowBackground />
          <ArrowIcon prev />
        </LeftButton>
        <RightButton
          onClick={handleNext}
          hideNext={hideNext}
          length={productList.length}
          index={index}
        >
          <ArrowBackground />
          <ArrowIcon next />
        </RightButton>

      </CarouselContainer>

      {typeof modal === 'number'
      && (
        <ModalBackground
          id="CompareProductsBackground"
          onClick={handleBackgroundClick}
        >
          <ComparisonModal
            onClick={(e) => { e.stopPropagation(); }}
            details={productList[modal].productInfo}
            closeModal={closeModal}
          />
        </ModalBackground>
      )}

    </>
  );
}

CardsList.propTypes = {
  productList: PropTypes.arrayOf(
    PropTypes.shape({
      productID: PropTypes.number,
      productInfo: PropTypes.shape({
        name: PropTypes.string,
        category: PropTypes.string,
        default_price: PropTypes.string,
      }),
      selectedStyle: PropTypes.shape({
        style_id: PropTypes.number,
        name: PropTypes.string,
        original_price: PropTypes.string,
        sale_price: PropTypes.string,
        'default?': PropTypes.bool,
        photos: PropTypes.arrayOf(
          PropTypes.shape({
            thumbnail_url: PropTypes.string,
            url: PropTypes.string,
          }),
        ),
        skus: PropTypes.shape({
          quantity: PropTypes.number,
          size: PropTypes.string,
        }),
      }),
    }),
  ).isRequired,
};

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
  position: relative;
  display: flex;
  transform: ${(props) => ((props.length - (1 * props.index) < 1) ? `translateX(calc(${props.translate}% * ${props.index - 1} * 1 + (${props.translate}% * (${props.length % 1}))))` : `translateX(calc(${props.translate}% * ${props.index} * 1))`)};
  transition: transform 0.4s;

  width: calc((100% + 2.5vw) / 1 * ${(props) => props.length});

  @media (min-width: 21.875em) {
    transform: ${(props) => ((props.length - (2 * props.index) < 2) ? `translateX(calc(${props.translate}% * ${props.index - 1} * 2 + (${props.translate}% * (${props.length % 2}))))` : `translateX(calc(${props.translate}% * ${props.index} * 2))`)};
    width: calc((100% + 2.5vw) / 2 * ${(props) => props.length});
  }
  @media (min-width: 37.5em) {
    transform: ${(props) => ((props.length - (3 * props.index) < 3) ? `translateX(calc(${props.translate}% * ${props.index - 1} * 3 + (${props.translate}% * (${props.length % 3}))))` : `translateX(calc(${props.translate}% * ${props.index} * 3))`)};
    width: calc((100% + 2.5vw) / 3 * ${(props) => props.length});
  }
  @media (min-width: 56em) {
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
  @media (min-width: 900px) {
    padding-right: 1.25vw;
    padding-left: 1.25vw;
  };
`;

const CarouselButton = styled.button`
  position: absolute;
  align-self: center;
  cursor: pointer;
  top: 50%;
  z-index: 7;
  transition: transform 0.1s ease-in-out;
  border: none;
  transform: translateY(-50%);
  padding: 0;
  margin: 0;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    opacity: 1;
  };
  font-weight: 500;
  background-color: ${(props) => props.theme.navBgColor};
  opacity: 0.8;
  line-height: 1;
  font-size: 1em;
  aspect-ratio: 1;
  height: 2em;
  @media (min-width: 700px) {
    font-size: 1.17em;
  };
`;

// box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
//   /* left: calc(2.5% - 0.5em); */
//   opacity: 1.0;
//   border-radius: 3px;
//   border: 1px lightgrey solid;
//   left: calc(2.5% + 0.25em);
//   /* left: calc(5% + 4px); */

const RightButton = styled(CarouselButton)`
  right: 0;
  display: ${(props) => ((props.hideNext || ((props.index + 1) * 1 >= props.length)) ? 'none' : 'block')};
  @media (min-width: 21.875em) {
    display: ${(props) => ((props.hideNext || ((props.index + 1) * 2 >= props.length)) ? 'none' : 'block')};
  }
  @media (min-width: 37.5em) {
    display: ${(props) => ((props.hideNext || ((props.index + 1) * 3 >= props.length)) ? 'none' : 'block')};
  }
  @media (min-width: 56em) {
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
 /* left: calc(2.5% + 0.25em); */
  display: ${(props) => (props.hidePrev ? 'none' : 'block')};
  @media (min-width: 900px) {
    left: 2.5%;
  };
`;

const ArrowBackground = styled.span`
  aspect-ratio: 1;
  display: flex;
  position: relative;
`;

const ArrowIcon = styled.span`
  ${(props) => props.prev && css`
    &::before {
      content: '〈';
      right: 75%;
      position: absolute;
      top: 50%;
      height: 50%;
      width: 50%;
      transform: translate(50%,-50%);
      padding: 0 6.25%;
    }
  `};

  ${(props) => props.next && css`
    &::before {
      content: ' 〉';
      left: 50%;
      position: absolute;
      top: 50%;
      height: 50%;
      width: 25%;
      transform: translate(-50%,-50%);
      padding: 0 12.5%;
    }
  `};
`;

const ModalBackground = styled.div`
  width: 90vw;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 1.25vw;
  top: 0%;
  z-index: 10;
  flex-direction: column;
`;
// width: 100vw;
// height: 100vh;

export default CardsList;
