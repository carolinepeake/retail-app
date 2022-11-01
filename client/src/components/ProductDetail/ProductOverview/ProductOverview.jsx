import React from 'react';
import styled from 'styled-components';
import { IoLogoFacebook, IoLogoTwitter, IoLogoPinterest } from 'react-icons/Io';
import RatingsAndReviews from '../../RatingsAndReviews/RatingsAndReviews';
import POStars from './POStars';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function ProductOverview() {
  const {
    productID, setProductID, productInfo, reviews, selectedStyle, setSelectedStyle, styles, setStyles
  } = useGlobalContext();


  return (
      <OverviewContainer>
        {reviews.length > 0
          ? (
            <>
              <POStars />
              <ReadReviews className="readReviews">
                <a href="RatingsAndReviews" style={{ color: 'black' }}>{`Read all ${reviews.length} reviews`}</a>
              </ReadReviews>
            </>
          )
          : (
              <ReadReviews>
                <a href="RatingsAndReviews">No reviews yet. Add one!</a>
              </ReadReviews>
          )}
        <br />
        <CategoryContainer>{productInfo.category}</CategoryContainer>
        <ProductName>{productInfo.name}</ProductName>
        <br />
        <SocialMediaContainer>
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
        <br />
        <PriceContainer>
          {selectedStyle.sale_price
          ? (
            <Price>
              <span style={{color: 'red '}}>
                {`$${selectedStyle.sale_price}    `}
              </span>
              <s>{selectedStyle.original_price}</s>
            </Price>
          )
          : (
            <Price>{`$${selectedStyle.original_price}`}</Price>
          )}
          </PriceContainer>

      </OverviewContainer>
   );
};

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
  display: block;
  grid-row: 1/2;
  grid-column: 4;
  margin-right: 25%;
`;

const ReadReviews = styled.h5`
  display: inline-block;
  margin-block-start: 0.5em;
  margin-block-end: 0em;
  color: black;
  text: underlined;
`;

const CategoryContainer = styled.h3`
  margin-top: calc(16px + 1vw); ;
  margin-bottom: calc(4px + 0.25vw); ;
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
  text-transform: uppercase;
`;

const ProductName = styled.h1`
  margin-top: calc(4px + 0.25vw);
  margin-bottom: calc(4px + 0.25vw);
`;

const SocialMediaContainer = styled.div`
  height: auto;
  width: auto;
  margin-block-end: calc(8px + 0.5vw);
  &:hover {
    cursor: pointer;
  };
  display: flex;
`;

const Logo = styled.div`
  flex: f1;
  flex-basis: 2.0rem;
  flex-grow: .75;
  flex-shrink: 1;
  padding: 0.25rem 0.25rem;
  &:hover {
    color: ${props => props.facebook && 'blue'};
    color: ${props => props.twitter && 'aqua'};
    color: ${props => props.pintrest && 'red'};
  };
  display: flex;
  justify-content: center;
  font-size: calc(8px + 1.5vw); ;
`;
//font-size: 2.0rem;

const ShareSocial = styled.div`
  max-width: 7.5rem;
  border: .1rem solid black;
  display: flex;
  flex-basis: 2.0rem 7.5rem;
  flex-shrink: 1;
  flex-grow: .75;
`;
// height: 2.0rem;
// width: 7.5rem;

const PriceContainer = styled.div`
  grid-row: 1;
  grid-column: 4;
`;

const Price = styled.h4`
  margin: auto 0;
`;

export default ProductOverview;