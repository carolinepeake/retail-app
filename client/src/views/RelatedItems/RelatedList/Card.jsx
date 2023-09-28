import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import CardImage from './CardImage';
import Stars from './Stars';
import CardButton from './CardButton';
import { calcAverageRating } from '../../../utils/getAverageRating';

// TODO: make "x" button appear only on hover & fade in - maybe use CSS instead of state
function Card({
  product,
  icon,
  onClickRightButton,
  idx,
  onChangeProd,
  compProdIdx,
  outfits,
  length,
}) {
  console.log('[Card] is running');
  const {
    setProductID,
  } = useGlobalContext();

  // understand why arrow functions do not bind
  // understand why need to wrap arrow function in useCallback
  // and use this type of function declaration/definition (understand which type it is)
  // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md

  // might not want to rest outfit list carousel
  const changeItem = () => {
    setProductID(product.productID);
    onChangeProd && onChangeProd();
  };

  // useCallback?
  const handleClickIconBtn = (e) => {
    e.stopPropagation();
    onClickRightButton(idx)
  };

  const rating = calcAverageRating(product?.revMeta?.ratings);

  const [hoverCard, setHoverCard] = useState(false);

  const handleMouseEnter = () => {
    setHoverCard(true);
    console.log('hndling enyer');
  };

  const handleMouseExit = () => {
    setHoverCard(false);
    console.log('hndling exit');
  };

  return (
  <CardContainer
    // length={outfits?.length + 1}
    length={length}
  >
    {/* <StyledCard
      onClick={changeItem}
    > */}
      <CardContent
        onClick={changeItem}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseExit}
        // i={idx}
      >

       {/* {hoverCard && <CardButton
          icon={icon}
          handleClickIconBtn={handleClickIconBtn}
          active={idx === compProdIdx}
        />} */}

        <CardButton
          icon={icon}
          handleClickIconBtn={handleClickIconBtn}
          active={idx === compProdIdx}
        />

        <CardImage
          imageUrl={product?.selectedStyle?.photos[0]?.thumbnail_url}
        />
        <TextContainer>
          <Text category>{product?.productInfo?.category}</Text>
          <Text productName>{product?.productInfo?.name}</Text>
          <Text price>
            {/* $ */}
            {/* {product?.productInfo?.default_price} */}
            {product?.selectedStyle?.sale_price
              ? (
                <>
                  <SalePrice>
                    {`$${product.selectedStyle.sale_price}    `}
                  </SalePrice>
                  <s>{product.selectedStyle?.original_price}</s>
                </>
              )
              : (
                <span>{`$${product?.selectedStyle?.original_price}`}</span>
              )}
            </Text>
          <Stars
            rating={rating}
          />
        </TextContainer>
      </CardContent>
      {/* </StyledCard> */}
  </CardContainer>
  );
}

Card.propTypes = {
  product: PropTypes.shape({
    productID: PropTypes.string,
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
  }).isRequired,
  onChangeProd: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  onClickRightButton: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
  compProdIdx: PropTypes.number,
};

Card.defaultProps = {
  compProdIdx: null,
};

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

const StyledCard = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.backgroundColor};
  margin: 0 auto;
  width: 100%;
 /* height: 100%; */
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
 /* border: lightgrey solid thin; */
  border-radius: 7.5px;
  justify-content: flex-end;
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  background-color: ${(props) => props.theme.backgroundColor};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 100%;

 /* &:hover {
    transform: translateY(-5%);
    transition: translateY 0.5s ease;
  } */

`;
// box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
// &:hover {
//   opacity: 0.80;
// }

// mask-image: ${(props) => (props.i === 3 ?
// 'linear-gradient(to right, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ')};
// mask-image: ${(props) => (props.i === 0 ?
// 'linear-gradient(to left, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ')};
// mask-image: ${(props) => (props.i === 3 ?
// 'linear-gradient(to right, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ')};

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
 /* margin-top: 0.2em;
  margin-left: 0.25em; */
  padding: 0.25em;
/*  padding: 0.5em; */
  gap: 0.25em;
  padding-bottom: calc(0.25rem + 0.25em);

`;

const Text = styled.div`

  ${(props) => props.productName && css`
    font-size: 1.17em;
    font-weight: 500;
    margin-bottom: 0.25em;

    &:hover {
      text-decoration: underline;
    }
  `};

  ${(props) => props.category && css`
    margin-top: 0.125em;

    &:hover {
      text-decoration: underline;
    }
  `};

  ${(props) => props.price && css`
    margin-bottom: calc(0.25rem + 0.125em);
    margin-top: 0.125em;
  `};

  margin-right: auto;
  line-height: 1em;
`;

const SalePrice = styled.span`
  color: ${(props) => props.theme.formError};
`;

export default Card;
