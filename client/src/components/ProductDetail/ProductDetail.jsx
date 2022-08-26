import React from 'react';
import styled from 'styled-components';

import ProductOverview from './ProductOverview/ProductOverview';
import StyleSelector from './StyleSelector/StyleSelector';
import ImageGallery from './ImageGallery/ImageGallery';
import AddToCart from './AddToCart/AddToCart';

import { useGlobalContext } from '../../contexts/GlobalStore';

// Works when ready to hook up API with URL
// setProductID(window.location.pathname || 40348);

function ProductDetail() {
  const { productID, productInfo, setProductID, setProductInfo, styles, selectedStyle, setSelectedStyle } = useGlobalContext();
  return (
    <CP
      style={{
        'marginTop': '4%',
        // 'marginRight': '2%',
        // 'marginLeft': '2%',
      }}
      id="product-details"
    >
      {/* <div>
        <ColumnParent> */}
          {/* <Column1> */}
            <Side />
            <ImageGallery />
          { productInfo.description
          && <ProductDescription />}
          {/* </Column1>
          <Column2> */}
            <ProductOverview />
            <StyleSelector />
            <AddToCart />
          {/* </Column2> */}
        {/* </ColumnParent>
      </div> */}
    </CP>
  );
}

export default ProductDetail;


const CP = styled.div`
  // display: flex;
  grid-column: 1/13;
  display: grid;
  //grid-template-columns: inherit
  display: contents;
  grid-row: 1/2;
  grid-auto-flow: row;
`;

const Main = styled.img`
  grid-column: 1 / 9;
 // display: inherit;
 display: grid;
  grid-row: 2 / 4;
  // display: flex;
  // margin: 0%;
  // width: 70%;
  // flex: 1.5;
  // justify-content: space-between;
  // flex-direction: column;
`;

const Column2 = styled.div`
  // padding: 2% 2%;
  text-align: left;
  // width: 30%;
  display: flex;
  flex-direction: column;
  grid-column: 9 / 13;
  grid-row: 2 / 4;
`;
