import React, { useState } from 'react';
import styled from 'styled-components';

import ProductOverview from './ProductOverview/ProductOverview';
import StyleSelector from './StyleSelector/StyleSelector';
import ImageGallery from './ImageGallery/ImageGallery';
import AddToCart from './AddToCart/AddToCart';
import Features from './ProductOverview/Features';

import { useGlobalContext } from '../../contexts/GlobalStore';

// Works when ready to hook up API with URL
// setProductID(window.location.pathname || 40348);

function ProductDetail() {
  const { productInfo } = useGlobalContext();
  const [status, setStatus] = useState('default');

  return (
    <ProductSec id="product-details">
      {status === 'default'
        ? (
          <>
            {/* <LeftColumn> */}
            <ImageGallery
              status={status}
              setStatus={setStatus}
            />
            <Details>
              <LeftBottom>
                {productInfo.slogan
            && <ProductSlogan>{productInfo.slogan}</ProductSlogan>}
                {productInfo.description
            && <ProductDescription>{productInfo.description}</ProductDescription>}
              </LeftBottom>
              {productInfo.features && <Features />}
            </Details>
            {/* </LeftColumn> */}
            <RightColumn>
              {/* <TopRight> */}
              <ProductOverview />
              <StyleSelector />
              <AddToCart />
              {/* </TopRight> */}
            </RightColumn>
          </>
        ) : (
          <Expanded>
            <ImageGallery
              status={status}
              setStatus={setStatus}
            />
          </Expanded>
        )}
    </ProductSec>
  );
}

// mobile:
{ /* <MainImage></MainImage>
<Thumbnails></Thumbnails>
<Title></Title>
<Category></Category>
<Price></Price>
<Stars></Reviews>
<Social></Social>
<Style></Style>
<AddtoBag></AddtoBag>
<ExpandDescription> */ }

export default ProductDetail;

const ProductSec = styled.div`
  @media (max-width: 600px) {
    padding-top: 5%;
    padding-left: 5%;
    padding-right: 5%;
  }

  @media (min-width: 600px) {
    display: grid;
    grid-template-columns: 10% minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) 10%;
    grid-template-rows: max-content max-content;
    column-gap: 1rem;
    row-gap: 2rem;
    max-width: 100%;
    margin-top: 1.5rem;
    margin-left: 2.5%;
  }
`;
// margin: 1.5rem 2.5% 0 2.5%;

// @media (min-width: 1200px) {
// }

// changed aspect ratio on image, grid columns maybe,
// moved thumbnails side from within main image,
// added margin to left of product details

// const LeftColumn = styled.div`

//   @media (min-width: 600px) {
//     height: 100%;
//     width: 100%;
//     display: flex;
//     grid-column: 1/4;
//     grid-row: 1;
//     flex-direction: column;
//   }
// `;
// grid-column: 1/4;

const Details = styled.div`
  @media (min-width: 600px) {
    grid-column: 2 / 6;
    grid-row: 2 / 3;
    display: contents;
  }
`;
const LeftBottom = styled.div`
  height: 100%;
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: 600px) {
    max-width: 800px;
    display: flex;
    flex-direction: column;
    grid-column: 2 / 4;
    grid-row: 2/3;
    justify-content: space-between;
    justify-items: space-between;
    padding-right: 1.5rem;
    padding-left: 2rem;
  };

  @media (min-width: 1200px) {
    max-width: initial;
    padding-right: 15%;
  };
`;

// @media (min-width: 1200px) {
//   max-width: '';
//   margin-left: 10%;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
// }

// const TopRight = styled.div`

//   @media (min-width: 600px) {
//     grid-column: 4 / span 2;
//     grid-row: 1;
//     display: contents;
//   }
// `;

const RightColumn = styled.div`
  background-color: white;
  padding-left: 0.25%;


  @media (min-width: 600px) {
    max-height: 800px;
    grid-column: 4 / span 2;
    grid-row: 1 / 2;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: space-evenly;
  }

  @media (min-width: 1200px) {
    grid-column: 4 / span 2;
    grid-row: 1 / 3
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: space-between;
  }
`;

// height: calc(61.585vw);

const ProductSlogan = styled.h3`
  font-size: 1.0rem;
  display: block;
  margin-block-start: 0.5em;
  margin-block-end: 0em;
  font-weight: bold;
  font-size: calc(10px + 1vw);

  @media (min-width: 600px) {
    font-size: calc(10px + 1vw);
    margin-block-start: 0px;
    margin: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;

const ProductDescription = styled.p`
  display: block;
  margin-block-end: 1em;
  margin-block-start: 0.5em;
  font-size: calc(10px + 1vw);

  @media (min-width: 600px) {
    font-size: 1.0rem;
    margin-block-end: 0px;
    margin-block-start: 0px;
    padding-top: 1.0rem;
  }

`;

const Expanded = styled.div`
  grid-column: 1/6;
  grid-row: 1;
  overflow: none;
  width: 100%;
  height: 100%;
  display: flex;
`;

// details
// ul
// list-style-type
// disclosure-closed
// disclosure-open
