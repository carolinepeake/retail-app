import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Card from '../RelatedList/Card';
import AddOutfit from './AddOutfit';

function OutfitList() {
  const {
    productID, productInfo, revMeta, selectedStyle,
  } = useGlobalContext();
  console.log('[OutfitList] is running');

  const [outfits, setOutfits] = useState([]);

  const [translate, setTranslate] = useState(100 / outfits.length);
  const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   const updatedTransform = -100 / (outfits.length + 1);
  //   setTranslate(updatedTransform);
  // }, [outfits.length]);

  const handlePrev = () => {
    const transform = -100 / (outfits.length + 1);
    setTranslate(transform);
    setIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    const transform = -100 / (outfits.length + 1);
    setTranslate(transform);
    setIndex((prev) => prev + 1);
  };

  const removeOutfit = (i) => {
    // moving index used for translation back 1 if currently at end of list
    // event.stopPropagation();
    const updatedTransform = -100 / outfits.length;
    setTranslate(updatedTransform);

    if (index === outfits.length) {
      setIndex((prev) => prev - 1);
    }

    const tempArray = [...outfits];
    tempArray.splice(i, 1);
    setOutfits(tempArray);
  };

  const handleAddOutfit = () => {
    for (let i = 0; i < outfits.length; i += 1) {
      if (outfits[i].productID === productID) {
        return;
      }
    }

    const scrollAfterAdding = () => {
      const updatedTransform = -100 / (outfits.length + 2);
      setTranslate(updatedTransform);
      setIndex((prev) => prev + 1);
    };
    scrollAfterAdding();

    const outfit = {
      productID,
      productInfo,
      revMeta,
      selectedStyle,
    };
    setOutfits((prev) => [...prev, outfit]);
  };

  return (
    <CarouselContainer>

      <CarouselContent
        translate={translate}
        length={outfits.length + 1}
        index={index}
      >
        {outfits.map((product, idx) => (
          <Card
            key={product.productID}
            length={outfits.length + 1}
            idx={idx}
            product={product}
            onClickRightButton={removeOutfit}
            icon="remove"
            outfits={outfits}
          />
        ))}

        {/* <CardContainer
          length={outfits.length + 1}
        > */}
          <AddOutfit
            length={outfits.length + 1}
            handleAddOutfit={handleAddOutfit}
          />
        {/* </CardContainer> */}

      </CarouselContent>

      <LeftButton
        onClick={handlePrev}
        index={index}
      >
        <ArrowBackground />
        <ArrowIcon $prev />
      </LeftButton>
      <RightButton
        onClick={handleNext}
        length={outfits.length + 1}
        index={index}
      >
        <ArrowBackground />
        <ArrowIcon $next />
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
  position: relative;
  display: flex;
  transform: ${(props) => (`translateX(calc(${props.translate} * ${props.index}  * 1%))`)};
  transition: transform 0.4s;
  width: calc((100% + 2.5vw) / 1 * ${(props) => props.length});

  @media (min-width: 21.875em) {
    width: calc((100% + 2.5vw) / 2 * ${(props) => props.length});
    transform: ${(props) => (props.length <= 2 ? 'translateX(0%)' : `translateX(calc(${props.translate} * ${props.index} * 1% - ${props.translate}%))`)};
  }
  @media (min-width: 37.5em) {
    width: calc((100% + 2.5vw) / 3 * ${(props) => props.length});
    transform: ${(props) => (props.length > 3 ? `translateX(calc(${props.translate} * ${props.index} * 1% - (${props.translate}% * 2)))` : 'translateX(0%)')};
  }
  @media (min-width: 56em) {
    transform: ${(props) => (props.length > 4 ? `translateX(calc(${props.translate} * ${props.index} * 1% - (${props.translate}% * 3)))` : 'translateX(0%)')};
    width: calc((100% + 1.25vw) / 4 * ${(props) => props.length});
  }
  @media (min-width: 1300px) {
    transform: ${(props) => (props.length > 5 ? `translateX(calc(${props.translate} * ${props.index} * 1% - (${props.translate}% * 4)))` : 'translateX(0%)')};
    width: calc((100% + 1.25vw) / 5 * ${(props) => props.length});
  }
  @media (min-width: 1650px) {
    transform: ${(props) => (props.length > 6 ? `translateX(calc(${props.translate} * ${props.index} * 1% - (${props.translate}% * 5)))` : 'translateX(0%)')};
    width: calc((100% + 1.25vw) / 6 * ${(props) => props.length});
  }
  @media (min-width: 2000px) {
    transform: ${(props) => (props.length > 7 ? `translateX(calc(${props.translate} * ${props.index} * 1% - (${props.translate}% * 6)))` : 'translateX(0%)')};
    width: calc((100% + 1.25vw) / 7 * ${(props) => props.length});
  }
  @media (min-width: 2350px) {
    transform: ${(props) => (props.length > 8 ? `translateX(calc(${props.translate} * ${props.index} * 1% - (${props.translate}% * 7)))` : 'translateX(0%)')};
    width: calc((100% + 1.25vw) / 8 * ${(props) => props.length});
  }
  @media (min-width: 2700px) {
    transform: ${(props) => (props.length > 9 ? `translateX(calc(${props.translate} * ${props.index} * 1% - (${props.translate}% * 8)))` : 'translateX(0%)')};
    width: calc((100% + 1.25vw) / 9 * ${(props) => props.length});
  }
`;

// TO-DO: implement scroll for mobile
const CardContainer = styled.div`
  margin: 0;
  width: calc(100% / ${(props) => props.length});
  padding-right: 2.5vw;
  padding-left: 2.5vw;
  /* height: 100%;
  aspect-ratio: 4/6; */
  @media (min-width: 900px) {
    padding-right: 1.25vw;
    padding-left: 1.25vw;
  };
`;
// width: 100%
// no aspect ratio

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
  }
  font-weight: 500;
  background-color: ${(props) => props.theme.navBgColor};
  opacity: 0.8;
  line-height: 1;
  font-size: 1em;
  aspect-ratio: 1;
  height: 2em;
  @media (min-width: 700px) {
    font-size: 1.17em;
  }
`;

const RightButton = styled(CarouselButton)`
  right: 0;
  display: ${(props) => (props.index + 1 < props.length ? 'block' : 'none')};

  @media (min-width: 21.875em) {
    display: ${(props) => (props.index + 2 < props.length && 'block')};
  }
  @media (min-width: 37.5em) {
    display: ${(props) => (props.index + 3 < props.length && 'block')};
  }
  @media (min-width: 56em) {
    display: ${(props) => (props.index + 4 < props.length && 'block')};
  }
  @media (min-width: 1300px) {
    display: ${(props) => (props.index + 5 < props.length && 'block')};
  }
  @media (min-width: 1650px) {
    display: ${(props) => (props.index + 6 < props.length && 'block')};
  }
  @media (min-width: 2000px) {
    display: ${(props) => (props.index + 7 < props.length && 'block')};
  }
  @media (min-width: 2350px) {
    display: ${(props) => (props.index + 8 < props.length && 'block')};
  }
  @media (min-width: 2700px) {
    display: ${(props) => (props.index + 9 < props.length && 'block')};
  }
`;

const LeftButton = styled(CarouselButton)`
  left: 5%;
  display: ${(props) => (props.index < 1 && 'none')};

  @media (min-width: 21.875em) {
    display: ${(props) => (props.index < 2 && 'none')};
  }
  @media (min-width: 37.5em) {
    display: ${(props) => (props.index < 3 && 'none')};
  }
  @media (min-width: 56em) {
    display: ${(props) => (props.index < 4 ? 'none' : 'block')};
  }
  @media (min-width: 900px) {
    left: 2.5%;
  }
  @media (min-width: 1300px) {
    display: ${(props) => (props.index >= 5 ? 'block' : 'none')};
  }
  @media (min-width: 1650px) {
    display: ${(props) => (props.index >= 6 ? 'block' : 'none')};
  }
  @media (min-width: 2000px) {
    display: ${(props) => (props.index >= 7 ? 'block' : 'none')};
  }
  @media (min-width: 2350px) {
    display: ${(props) => (props.index >= 8 ? 'block' : 'none')};
  }
  @media (min-width: 2700px) {
    display: ${(props) => (props.index >= 9 ? 'block' : 'none')};
  }
`;

const ArrowBackground = styled.span`
  aspect-ratio: 1;
  display: flex;
  position: relative;
`;

const ArrowIcon = styled.span`
  ${(props) => props.$prev && css`
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

  ${(props) => props.$next && css`
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

export default OutfitList;
