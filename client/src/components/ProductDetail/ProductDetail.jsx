import React, { useRef, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ProductOverview from './ProductOverview/ProductOverview';
import StyleSelector from './StyleSelector/StyleSelector';
import ImageGallery from './ImageGallery/ImageGallery';
import AddToCart from './AddToCart/AddToCart';

import { useGlobalContext } from '../../contexts/GlobalStore';

// Works when ready to hook up API with URL
// setProductID(window.location.pathname || 40348);

function ProductDetail() {
  const { productInfo } = useGlobalContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDefault, setIsDefault] = useState(false);

  return (
    <ProductSec id="product-details">
      <LeftColumn
      style={{height: '100%', width: '100%', display: isExpanded ? 'none' : isZoomed ? 'none' : 'flex'}}
      >
        <ImageGallery
        setIsExpanded={setIsExpanded} isExpanded={isExpanded}
        setIsDefault={setIsDefault}
        isDefault={isDefault}
        setIsZoomed={setIsZoomed}
        isZoomed={isZoomed}
        />
        <LeftBottom>
        <br />
          {productInfo.slogan
          && <ProductSlogan>{productInfo.slogan}</ProductSlogan>}
          {productInfo.description
          && <ProductDescription>{productInfo.description}</ProductDescription>}
        </LeftBottom>
      </LeftColumn>
      <RightColumn expanded={isExpanded} zoomed={isZoomed}>
        <TopRight
         >
          <ProductOverview />
          <StyleSelector />
          <AddToCart />
        </TopRight>
      </RightColumn>
      <Expanded style={{ display: isExpanded ? 'block' : isZoomed ? 'block' : 'none' }}>
      <ImageGallery
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        setIsDefault={setIsDefault}
        isDefault={isDefault}
        setIsZoomed={setIsZoomed}
        isZoomed={isZoomed}
      />
    </Expanded >
    </ProductSec>
  );
};

export default ProductDetail;

let ProductSec = styled.div`
  display: grid;
  grid-row: 2;
  grid-column: 1/4;
  grid-template-columns: 10% minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) 10%;
  column-gap: 1rem;
  max-width: 100%;
`;

const LeftColumn = styled.div`
   grid-column: 1/4;
   grid-row: 1;
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

const RightColumn = styled.div`
  grid-column: 4 / span 2;
  grid-row: 1;
  display: contents;
  ${props => props.zoomed && css`
    display: none;
  `};
  ${props => props.expanded && css`
    display: none;
  `};
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

const Expanded = styled.div`
  grid-column: 1/6;
  grid-row: 1;
  overflow: none;
  width: 100%;
  height: 100%;
  display: flex;
`;









