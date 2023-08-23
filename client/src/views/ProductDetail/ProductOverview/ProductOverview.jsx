import React from 'react';
import styled from 'styled-components';
import Stars from '../../RelatedItems/RelatedList/Stars';
import SocialMedia from './SocialMedia';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import { calcAverageRating } from '../../../utils/getAverageRating';

function ProductOverview() {
  const {
    productInfo,
    reviews,
    revMeta,
    selectedStyle,
  } = useGlobalContext();

  let rating;
  if (revMeta.ratings) {
    rating = calcAverageRating(revMeta.ratings);
  }

  return (
    <OverviewContainer>
      {reviews?.length > 0
        && (
          <div>
            <Stars rating={rating} />
            <ReadReviews>
              <ReviewsLink href="#ratings-and-reviews">{`Read all ${reviews?.length} reviews`}</ReviewsLink>
            </ReadReviews>
          </div>
        )}
      <CategoryContainer>{productInfo?.category}</CategoryContainer>
      <ProductName>{productInfo?.name}</ProductName>
      <PriceContainer>
        {selectedStyle?.sale_price
          ? (
            <Price>
              <SalePrice>
                {`$${selectedStyle?.sale_price}    `}
              </SalePrice>
              <s>{selectedStyle?.original_price}</s>
            </Price>
          )
          : (
            <Price>{`$${selectedStyle?.original_price}`}</Price>
          )}
      </PriceContainer>

      <SocialMedia />

    </OverviewContainer>
  );
}

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10%;
  background-color: ${(props) => props.theme.backgroundColor};

  @media (min-width: 600px) {
    margin-right: 0px;
  }

  @media (min-width: 1000px) {
    margin-right: 10%;
  }
`;

const ReadReviews = styled.h5`
  display: inline-block;
  margin-block-start: 0.5em;
  margin-block-end: 0em;
  margin-left: 0.75em;
`;

const ReviewsLink = styled.a`
  &:link {
    text-decoration: underline;
  }
  &:visited {
    color: ${(props) => props.theme.fontColor};
    text-decoration: none;
  }
  &:hover {
    text-decoration: none;
  }
  &:active {
    color: ${(props) => props.theme.visitedColor};
  }
`;

const CategoryContainer = styled.h3`
  margin-bottom: calc(0.2136em + 0.25vw);
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1.17em;
  font-weight: 300;

  @media (max-width: 600px) {
    display: none;
  }
`;

const ProductName = styled.h1`
  margin: 0;

  @media (max-width: 600px) {
    order: -1;
  }
`;

const PriceContainer = styled.div`
  font-size: ${(props) => props.theme.body};
  font-weight: 300;
`;

const Price = styled.h4`
  margin-top: calc(0.534em + 0.5vw);
  margin-bottom: calc(0.2136em + 0.25vw);
  font-size: 1.17em;
`;

const SalePrice = styled.span`
  color: ${(props) => props.theme.formError};;
`;

export default ProductOverview;
