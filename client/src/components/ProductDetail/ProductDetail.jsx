import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductOverview from './ProductOverview/ProductOverview';
import StyleSelector from './StyleSelector/StyleSelector';
import ImageGallery from './ImageGallery/ImageGallery';
import AddToCart from './AddToCart/AddToCart';

import { useGlobalContext } from '../../contexts/GlobalStore';

// and make 2.5 zoom in, make zoom in modal smaller, and make mouse magnifying icon when zoomed in
// accessibility
// url
// time to first paint

// Works when ready to hook up API with URL
// setProductID(window.location.pathname || 40348);

function ProductDetail() {
  const { productInfo } = useGlobalContext();
  const mainImage = useRef();
  const [height, setHeight] = useState(0);

  // const setMaxHeight = async () => {
  //   try {
  //     let computedImageHeight = await parseInt(window
  //       .getComputedStyle(mainImage.current)
  //       .getPropertyValue("height"));
  //     console.log('computedImageHeight: ', computedImageHeight);
  //     await setHeight(computedImageHeight);
  //     console.log('height: ', height);
  //   } catch (err) {
  //     console.log('error computing and setting max image height');
  //   }
  //   return height;
  // };

  //   useEffect(() => {
  //   setMaxHeight();
  // }, []);

  return (
    <ProductSec id="product-details">
      <LeftColumn
      style={{height: '100%', width: '100%'}}
      //ref={mainImage}
      // not currently working
      //onResize={() => setMaxHeight()}
      >
        <ImageGallery
        //  ref={mainImage}
        />
        <LeftBottom>
        <br />
          {productInfo.slogan
          && <ProductSlogan>{productInfo.slogan}</ProductSlogan>}
          {productInfo.description
          && <ProductDescription>{productInfo.description}</ProductDescription>}
        </LeftBottom>
      </LeftColumn>
      <RightColumn>
        <TopRight
        // height={height}
         >
          <ProductOverview />
          <StyleSelector />
          <AddToCart />
        </TopRight>
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
  column-gap: 1rem;
  overflow: none;
  max-width: 100%;
`;

const LeftColumn = styled.div`
   grid-column: 1/4;
   grid-row: 1;
   display: flex;
   flex-direction: column;
`;

const LeftBottom = styled.div`
  display: flex;
  flex-direction: column;
  height: max-content;
  max-width: 700px;
  margin: 0 auto;
  margin-left: 20%;
`;

// justify content: flex-start and add larger margin-bottom below StyleSelector if making ProductDetail 1 row
const RightColumn = styled.div`
  grid-column: 4 / span 2;
  grid-row: 1;
  display: contents;
`;

const TopRight = styled.div`
  max-height: 800px;
  grid-column: 4 / span 2;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  height: calc(61.585vw);
`;
//height: ${props => props.height + 'px'};

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






