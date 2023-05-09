import React from 'react';
import styled from 'styled-components';
import POStars from './POStars';
import SocialMedia from './SocialMedia';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function ProductOverview() {
  const { productInfo, reviews, selectedStyle } = useGlobalContext();

  return (
    <OverviewContainer>
      {reviews.length > 0
        && (
          <div>
            <POStars />
            <ReadReviews className="readReviews">
              <ReviewsLink href="#ratings-and-reviews">{`Read all ${reviews.length} reviews`}</ReviewsLink>
            </ReadReviews>
          </div>
        )}
      {/* // : (
        //   <ReadReviews>
        //     <a href="#ratings-and-reviews">No reviews yet. Add one!</a>
        //   </ReadReviews>
        // ) */}
      <CategoryContainer>{productInfo.category}</CategoryContainer>
      <ProductName>{productInfo.name}</ProductName>
      <PriceContainer>
        {selectedStyle.sale_price
          ? (
            <Price>
              <span style={{ color: 'red ' }}>
                {`$${selectedStyle.sale_price}    `}
              </span>
              <s>{selectedStyle.original_price}</s>
            </Price>
          )
          : (
            <Price>{`$${selectedStyle.original_price}`}</Price>
          )}
      </PriceContainer>

      <SocialMedia />

    </OverviewContainer>
  );
}

// ProductOverview.propTypes = {
//   data: PropTypes.shape({
//     details: PropTypes.shape({
//       data: PropTypes.shape({
//         id: PropTypes.number,
//         name: PropTypes.string,
//         category: PropTypes.string,
//         default_price: PropTypes.string,
//       }),
//     }),
//   }).isRequired,
// };

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-row: 1/2;
  grid-column: 4;
  margin-right: 10%;
  background-color: ${(props) => props.theme.backgroundColor};

  @media (min-width: 600px) AND (max-width: 800px) {
    margin-right: 0;
  };
`;

const ReadReviews = styled.h5`
  display: inline-block;
  margin-block-start: 0.5em;
  margin-block-end: 0em;
  text: underlined;
  font-size: ${(props) => props.theme.tertiary};
`;

const ReviewsLink = styled.a`
  &:hover {
    text-decoration: none;
  };
  color: black;
  &:visited {
    color: initial;
  };
  font-weight: normal;
`;

const CategoryContainer = styled.h3`
  margin-bottom: calc(4px + 0.25vw); ;
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
  text-transform: uppercase;
  font-weight: normal;
  font-size: ${(props) => props.theme.body};

  @media (max-width: 600px) {
    display: none;
  };
`;
// font-size: 1rem;

const ProductName = styled.h1`
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: ${(props) => props.theme.header};

  @media (max-width: 600px) {
    order: -1;
  };
`;

// TO-DO: make social media container same size as price & style but separate by color



const PriceContainer = styled.div`
  grid-row: 1;
  grid-column: 4;
  font-size: ${(props) => props.theme.body};
`;

const Price = styled.h4`
  font-weight: normal;
  margin-top: calc(10px + 0.5vw);
  margin-bottom: calc(4px + 0.25vw);
  font-size: 1.5em;

  @media (max-width: 900px) {
    font-size: 1.5em;
  };
`;
// font-size: ${(props) => props.theme.body};
// @media (max-width: 700px) {
//   font-size: 1.5em;
// };

export default ProductOverview;
