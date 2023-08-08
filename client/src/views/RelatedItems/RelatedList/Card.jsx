import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';
// import StarButton from './StarButton';
import CardImage from './CardImage';
import Stars from './Stars';
import {
  calcAverageRating,
  // getProductInfo,
  // getReviewsMetaData,
} from '../../../utils/useAverageRating';

function Card({
  product, setIndex, setTranslate, children
}) {
  console.log('[Card] is running');
  const {
    setProductID,
  } = useGlobalContext();

  // understand why passing function as JSX props causes unnecessary re-render
  // understand why arrow functions do not bind
  // understand why need to wrap arrow function in useCallback
  // and use this type of function declaration/definition (understand which type it is)
  // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md

  function changeItem() {
    setProductID(product.productID);
    // Reset card index when clicking on new item
    setIndex(0);
    setTranslate(0);
  }

  const rating = calcAverageRating(product.revMeta.ratings);

  return (
    <CardContainer
      onClick={() => changeItem()}
    >
      <CardContent>
        {children}

        <CardImage
          imageUrl={product.selectedStyle.photos[0].thumbnail_url}
        />
        <TextContainer>
          <Text category>{product.productInfo.category}</Text>
          <Text productName>{product.productInfo.name}</Text>
          <Text price>
            $
            {product.productInfo.default_price}
          </Text>
          <Stars
            rating={rating}
          />
        </TextContainer>
      </CardContent>
    </CardContainer>
  );
}

// Card.propTypes = {
//   product: PropTypes.shape({
//     productID: PropTypes.number,
//     productInfo: PropTypes.shape({
//       name: PropTypes.string,
//       category: PropTypes.string,
//       default_price: PropTypes.string,
//     }),
  //   selectedStyle: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       style_id: PropTypes.number,
  //       name: PropTypes.string,
  //       original_price: PropTypes.string,
  //       sale_price: PropTypes.string,
  //       'default?': PropTypes.bool,
  //       photos: PropTypes.arrayOf(
  //         thumbnail_url: PropTypes.string,
  //         url: PropTypes.string,
  //       ),
  //       skus: PropTypes.shape({
  //         PropTypes.string: PropTypes.shape({
  //           size: PropTypes.number,
  // }).isRequired,
// };

const CardContainer = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.backgroundColor};
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  border: lightgrey solid thin;
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
  margin-right: auto;
  font-size: ${(props) => props.theme.tertiary};
  padding-top: ${(props) => (props.category ? '0.1em' : props.productName ? '0.05em' : props.price ? '0.25em' : '')};
  padding-bottom: ${(props) => props.price && '0.25em'};
  ${(props) => props.productName && css`
    font-size: ${props.theme.body};
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  `};
  ${(props) => props.category && css`
    &:hover {
      text-decoration: underline;
    }
  `};
`;

export default Card;
