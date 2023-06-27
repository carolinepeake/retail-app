import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import StarButton from './StarButton';
import CardImage from './CardImage';
import Stars from './Stars';
import { calcAverageRating, getProductInfo, getReviewsMetaData } from '../../utils/useAverageRating';

function Card({
  product,
  // image,
  // i,
  // cardWidth, numberOfCards, card
  // index,
  // length,
}) {
  const {
    setProductID,
  } = useGlobalContext();

  // function changeItem() {
  //   setProductID(details.id);
  //   // Reset card index when clicking on new item
  //   // setCardIndex(0);
  // }

  // const numVisible = 4;

  console.log('product from card: ', product);

  const rating = calcAverageRating(product.stars.data.ratings);

  return (
    <CardContainer
      // i={i}
      // numVisible={numVisible}
    // cardWidth={cardWidth} numberOfCards={numberOfCards} card={card}
      // index={index}
      // className="carousel-card"
      onClick={() => setProductID(product.details.data.id)}
    >
      {/* { product.details
        ? ( */}
      <CardStyle>
        <StarButton
          details={product.details.data}
        />
        <CardImage
          imageUrl={product.image.data.results[0].photos[0].thumbnail_url}
        />
        <Text>
          <Cards category>{product.details.data.category}</Cards>
          <Cards productName>{product.details.data.name}</Cards>
          <Cards price>
            $
            {product.details.data.default_price}
          </Cards>
        </Text>
        <Stars
          rating={rating}
        />
      </CardStyle>
      {/* )
        : <div /> } */}
    </CardContainer>
  );
}

// Card.propTypes = {
//   product: PropTypes.shape({
//     details: PropTypes.shape({
//       id: PropTypes.number,
//       name: PropTypes.string,
//       category: PropTypes.string,
//       default_price: PropTypes.string,
//     }),
  //   image: PropTypes.arrayOf(
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
// aspect-ratio: 4/6;

// width: 220px;
// flex-shrink: 0;
// padding-right: ${(props) => (props.cardWidth / 5)}px;
// width: ${(props) => props.card}px;
// width: ${(props) => props.cardWidth}px;
// &&:nth-child(n) {
//   ${(props) => (((props.index + 1) % props.numberOfCards === 0) && css`
//     padding-right: 0;
//     width: ${props.actualCardWidth - (props.cardWidth / 5)}px;
//   `)};
// width: ${props.actualCardWidth - (props.cardWidth / 5)}px;
// ${(props) => (((props.index + 1) % props.numberOfCards === 0) && css`
//     padding-right: 0;
//   `)};
// padding-right: 1em;
// width: 220px;
//   @media (min-width: 1032px) {
//     width: 240px;
//   };

// width: 90vw;
// &&:last-of-type {
//   margin-right: 0;
// };
// &&:${(props) => props.numVisible}-of-type {
//   margin-right: 0;
// };
// @media (min-width: 400px) {
//   width: calc(95vw / 2 - 1em);
//   margin-right: 1em;
//   margin-left: 0;
// };
// @media (min-width: 800px) {
//   width: calc(95vw / 3 - 2em);
//   margin-right: 2em;
// }
// @media (min-width: 1032px) {
//   width: calc(95vw / 4 - 3em);
// };

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  border: black solid medium transparent;
  border: lightgrey solid thin;
  justify-content: flex-end;
  height: 100%;
  position: relative;
`;
// box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

// mask-image: ${(props) => (props.i === 3 ?
// 'linear-gradient(to right, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ')};
// mask-image: ${(props) => (props.i === 0 ?
// 'linear-gradient(to left, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ')};
// mask-image: ${(props) => (props.i === 3 ?
// 'linear-gradient(to right, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ')};

const Cards = styled.div`
  margin-right: auto;
  font-size: ${(props) => props.theme.tertiary};
  paddingTop: ${(props) => (props.category ? '0.1em' : props.productName ? '0.05em' : '')};
  padding: ${(props) => props.price && '0.25em'};
  padding-left: 0.25em;
  ${(props) => props.productName && css`
    font-size: ${props.theme.body};
    font-weight: 500;
  `};
`;
// font-size: ${props.theme.cardTitle};
// font-size: ${(props) => props.theme.cardText};
// font-size: 1.0rem;
// padding-left: 0.25rem;
// ${props => props.name && css`
// font-size: 1.25rem;
// fontWeight: '500'
// `}
// margin-left: auto;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
  margin-top: 0.2em;
`;

export default Card;
