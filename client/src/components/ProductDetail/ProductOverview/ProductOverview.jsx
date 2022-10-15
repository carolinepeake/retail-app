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
        {/* <ReviewContainer> */}
        {reviews.length > 0
          ? (
            <>
              <POStars />
              <ReadReviews className="readReviews">
                <a href="RatingsAndReviews" style={{ color: 'black' }}>{`Read all ${reviews.length}+ reviews`}</a>
              </ReadReviews>
            </>
          )
          : (
              <ReadReviews>
                <a href="RatingsAndReviews">No reviews yet. Add one!</a>
              </ReadReviews>
          )}
        {/* </ReviewContainer> */}
        <br />
        <CategoryContainer>{productInfo.category}</CategoryContainer>
        <br />
        <ProductName>{productInfo.name}</ProductName>
        <br />
        <SocialMediaContainer>
          <ShareSocial>
            <Facebook>
              <IoLogoFacebook />
            </Facebook>
            <Twitter>
              <IoLogoTwitter />
            </Twitter>
            <Pinterest>
              <IoLogoPinterest />
            </Pinterest>
          </ShareSocial>
        </SocialMediaContainer>
        <br />
        <PriceContainer>
          {selectedStyle.sale_price
          ? (
            <Price>
              <span style={{color: 'red '}}>
                {`${selectedStyle.sale_price}    `}
              </span>
              <s>{selectedStyle.original_price}</s>
            </Price>
          )
          : (
            <Price>{selectedStyle.original_price}</Price>
          )}
          </PriceContainer>
          <br />
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

//font-size: 1.25rem;

//font-size: 0.7rem;

// margin-top: 1em;

// const OverviewContainer = styled.div`
//   display: block;
//   //flex-direction: column;
//   //grid-column: 4;
//   //align-items: space between;
//   //grid-row: 1;
//   flex: 3 1;
// `;

// const ReviewContainer = styled.div`
//   height: 5%;
//   width: auto;
// `;

const CategoryContainer = styled.h3`
  margin-top: calc(16px + 1vw); ;
  margin-bottom: calc(4px + 0.25vw); ;
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
  text-transform: uppercase;
`;
//font-size: 1.5rem;

const ProductName = styled.h2`
  margin-top: calc(4px + 0.25vw);
  margin-bottom: calc(4px + 0.25vw);
`;
//font-size: 2.0rem;

const SocialMediaContainer = styled.div`
  height: auto;
  width: auto;
  margin-block-end: calc(8px + 0.5vw);
  &:hover {
    cursor: pointer;
  };
  display: flex;
`;

const Facebook = styled.div`
  flex: f1;
  flex-basis: 2.0rem;
  flex-grow: .75;
  flex-shrink: 1;

  padding: 0 0.25rem;
  &:hover {
    color: blue;
  };
`;
//font-size: 2.0rem;
const Twitter = styled.div`
  flex: f1;
  flex-basis: 2.0rem;
  flex-grow: .75;
  flex-shrink: 1;

  padding: 0 0.25rem;
  &:hover {
    color: aqua;
  };
`;
//font-size: 2.0rem;
const Pinterest = styled.div`
  flex: f1;
  flex-basis: 2.0rem;
  flex-grow: .75;
  flex-shrink: 1;

  padding: 0 0.25rem;
  &:hover {
    color: red;
  };
`;
//font-size: 2.0rem;

const ShareSocial = styled.div`
  height: 2.0rem;
  width: 7.5rem;
  max-width: 7.5rem;
  border: .1rem solid black;
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
  margin: auto 0;
`;
//font-size: 1.25rem;
// const Price = styled.h5`
//   margin-block-start: 0em;
//   margin-block-end: 0em;
// `;


export default ProductOverview;