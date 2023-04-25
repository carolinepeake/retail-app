import React from 'react';
import styled from 'styled-components';
import { IoLogoFacebook, IoLogoTwitter, IoLogoPinterest } from 'react-icons/io';
import POStars from './POStars';
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
      <SocialMediaContainer>
        <Like>Like it? Share it!</Like>
        <ShareSocial>
          <Logo facebook>
            <IoLogoFacebook />
          </Logo>
          <Logo twitter>
            <IoLogoTwitter />
          </Logo>
          <Logo pintrest>
            <IoLogoPinterest />
          </Logo>
        </ShareSocial>
      </SocialMediaContainer>
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
  margin-right: 25%;
  background-color: ${(props) => props.theme.backgroundColor}
`;

const ReadReviews = styled.h5`
  display: inline-block;
  margin-block-start: 0.5em;
  margin-block-end: 0em;
  text: underlined;
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
  font-size: 1rem;
`;

const ProductName = styled.h1`
  margin-top: 0px;
  margin-bottom: 0px;
`;

const SocialMediaContainer = styled.div`
  height: auto;
  width: auto;
  &:hover {
    cursor: pointer;
  };
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: 1.0rem 0;
`;
// margin-block-end: calc(8px + 0.5vw);
//   margin-top: calc(8px + 0.5vw);
//   margin-top: 0.5rem;
//   margin-bottom: 0.5rem;

const Like = styled.div`
  font-size: 1rem;
`;

const Logo = styled.div`
  flex: f1;
  flex-basis: 2.0rem;
  flex-grow: .75;
  flex-shrink: 1;
  padding-right: 0.5rem;
  padding-top: 0.5rem;
  &:hover {
    color: ${(props) => props.facebook && 'blue'};
    color: ${(props) => props.twitter && 'aqua'};
    color: ${(props) => props.pintrest && 'red'};
  };
  display: flex;
  justify-content: center;
  font-size: calc(8px + 1.5vw); ;
`;

const ShareSocial = styled.div`
  max-width: 7.5rem;
  display: flex;
  flex-basis: 2.0rem 7.5rem;
  flex-shrink: 1;
  flex-grow: .75;
`;

const PriceContainer = styled.div`
  grid-row: 1;
  grid-column: 4;
`;

const Price = styled.h4`
  font-weight: normal;
  margin-top: calc(10px + 0.5vw);
  margin-bottom: calc(4px + 0.25vw);
`;

export default ProductOverview;
