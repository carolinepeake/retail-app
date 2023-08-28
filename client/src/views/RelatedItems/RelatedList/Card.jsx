import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import CardImage from './CardImage';
import Stars from './Stars';
import StarButton from './StarButton';
import { calcAverageRating } from '../../../utils/getAverageRating';

// TODO: make "x" button appear only on hover
function Card({
  product,
  setIndex,
  setTranslate,
  icon,
  onClickRightButton,
  i,
}) {
  console.log('[Card] is running');
  const {
    setProductID,
  } = useGlobalContext();

  // understand why arrow functions do not bind
  // understand why need to wrap arrow function in useCallback
  // and use this type of function declaration/definition (understand which type it is)
  // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md

  const changeItem = () => {
    setProductID(product?.productID);
    setIndex(0);
    setTranslate(0);
  };

  const rating = calcAverageRating(product?.revMeta?.ratings);

  return (
    <CardContainer
      onClick={changeItem}
    >
      <CardContent>

        <StarButton
          icon={icon}
          onClickRightButton={onClickRightButton}
          i={i}
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
    </CardContainer>
  );
}

Card.propTypes = {
  product: PropTypes.shape({
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
  }).isRequired,
  setIndex: PropTypes.func.isRequired,
  setTranslate: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  onClickRightButton: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired,
};


const CardContainer = styled.div`
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
  justify-content: flex-end;
  height: 100%;
  position: relative;
  overflow: hidden;
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
  cursor: pointer;
  margin-top: 0.2em;
  margin-left: 0.25em;
`;

const Text = styled.div`
  ${(props) => props.productName && css`
    font-size: 1.17em;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
    margin-top: 0.05em 0;
  `};

  ${(props) => props.category && css`
    &:hover {
      text-decoration: underline;
    }
    margin-top: 0.1em;
  `};

  ${(props) => props.price && css`
    margin: 0.25em 0;
  `};

  margin-right: auto;
`;

const SalePrice = styled.span`
  color: ${(props) => props.theme.formError};
`;

export default Card;
