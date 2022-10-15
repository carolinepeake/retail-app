import React from 'react';
import styled from 'styled-components';
import ProductOverview from './ProductOverview/ProductOverview';
import StyleSelector from './StyleSelector/StyleSelector';
import ImageGallery from './ImageGallery/ImageGallery';
import AddToCart from './AddToCart/AddToCart';

import { useGlobalContext } from '../../contexts/GlobalStore';

// will want to fade out related images and outfit carousel
// and make 2.5 zoom in, make zoom in modal smaller, and make mouse magnifying icon when zoomed in
// accessibility
// url
// time to first paint

// Works when ready to hook up API with URL
// setProductID(window.location.pathname || 40348);

function ProductDetail() {
  const { productInfo } = useGlobalContext();

  return (
    <ProductSec id="product-details">
      {/* <LeftColumn> */}
        <ImageGallery />
        <br />
        <LeftBottom>
          {productInfo.slogan
          && <ProductSlogan>{productInfo.slogan}</ProductSlogan>}
          {productInfo.description
          && <ProductDescription>{productInfo.description}</ProductDescription>}
        </LeftBottom>
      {/* </LeftColumn> */}
      <RightColumn>
          <ProductOverview />
          <StyleSelector />
          <AddToCart />
      </RightColumn>
    </ProductSec>
  );
};

export default ProductDetail;

// make a max-width (max size for the main image) maybe the standard height of a computer so can always see full square
// also make a max-width for the thumbnails -- although might not actually need to if main image has max width
// margin 0 auto then centers the main image if reaches max-width so there's white space around it


let ProductSec = styled.div`
  display: grid;
  grid-row: 2;
  grid-column: 1/4;
  grid-template-columns: 10% minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) 10%;
  grid-template-rows: 1fr;
  column-gap: 1rem;
  overflow: none;
  max-width: 100%;
`;
// repeat(3, 1fr)
//grid-template-rows: auto;

//grid-template-auto-rows: 1fr 1.5rem 1rem 1fr 1fr 1.5rem 1fr;

//   margin-top: 2%;
//   grid-column: 1/4;
//   //display: grid;
//   //grid-template-columns:
//  // grid-template-columns: 1fr 3fr 3fr 3fr 1fr;
//   //grid-auto-rows:
//   column-gap: 1em;
//   display: flex;
//   flex-direction: row;

// const LeftTop = styled.div`
//   grid-column: 1/4;
//   grid-row: 1;
//   display: contents;
//   width: 100%;
//   height: 100%;
// `;

// const LeftColumn = styled.div`
//    grid-column: 1/4;
//    grid-row: 1;
//    display: contents;
//    width: 100%;
//    height: 100%;
// `;

// change grid-row to 1 to get rid of gap
const LeftBottom = styled.div`
  grid-column: 2/4;
  display: flex;
  flex-direction: column;
  height: max-content;
  max-width: 700px;
  margin: 0 auto;
  grid-row: 2;
`;

// justify content: flex-start and add larger margin-bottom below StyleSelector if making ProductDetail 1 row
const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 4 / span 2;
  grid-row: 1;
  align-items: space-between;
  justify-content: space-between;
`;

const ProductSlogan = styled.h3`
  display: block;
  margin-block-start: 0.5em;
  margin-block-end: 0em;
  font-weight: bold;
`;

const ProductDescription = styled.p`
  display: block;
  margin-block-end: 0em;
`;






