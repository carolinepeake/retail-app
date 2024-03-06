import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { useGlobalContext } from '../../contexts/GlobalStore';
import ProductOverview from './ProductOverview/ProductOverview';
import StyleSelector from './StyleSelector/StyleSelector';
import ImageGallery2 from './ImageGallery/ImageGallery2';
import ImageGallery3 from './ImageGallery/ImageGallery2';
import ImageGallery from './ImageGallery/ImageGallery';
import DefaultView from './ImageGallery/DefaultView';
import AddToCart from './AddToCart/AddToCart';
import CollapsedDetails from './ProductOverview/CollapsedDetails';
import ProductPath from './ProductOverview/ProductPath';

function ProductDetail() {
  console.log('[ProductDetail] is running');
  const [status, setStatus] = useState('default');
  const [startingIndex, setStartingIndex] = useState(0);
  const { productInfo } = useGlobalContext();

  // const handleClickMain = () => {
  //   switch (status) {
  //     case 'default':
  //       setStatus('expanded');
  //       break;
  //     case 'expanded':
  //       setStatus('zoomed');
  //       // handleZoom(e);
  //       // handlePanImage(e);
  //       break;
  //     case 'zoomed':
  //       setStatus('expanded');
  //       // scrollToId(place);
  //       break;
  //     default:
  //       console.log('error handling expand main');
  //   }
  // };

  return (
    <ProductSec id="product-details">

      {status === 'default'
      && (
        <ProductPath />
      )}

      <ProductContainer
        status={status}
      >
        {/* <ImageGallery2
          status={status}
          setStatus={setStatus}
          startingIndex={startingIndex}
          setStartingIndex={setStartingIndex}
        /> */}

        <ImageGallery
          status={status}
          setStatus={setStatus}
          startingIndex={startingIndex}
          setStartingIndex={setStartingIndex}
        />

           {/* <ImageGallery3
          status={status}
          setStatus={setStatus}
          startingIndex={startingIndex}
          setStartingIndex={setStartingIndex}
        /> */}

        {/* <DefaultView
          handleClickMain={handleClickMain}
          status={status}
          setStatus={setStatus}
          startingIndex={startingIndex}
          setStartingIndex={setStartingIndex}
        /> */}

        {status === 'default'
        && (
          <RightColumn>
            <ProductOverview />
            <StyleSelector />
            <AddToCart />
            <CollapsedDetails />
          </RightColumn>
        )}

      </ProductContainer>
    </ProductSec>
  );
}

export default ProductDetail;

const ProductSec = styled.div`
 /* padding-left: 5%;
  padding-right: 5%;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 5%;

  @media (min-width: 600px) {
    padding-bottom: 0;
    margin-bottom: 0;
  }

  @media (min-width: 1200px) {
    margin-right: auto;
    margin-left: auto;
  } */
`;

const ProductContainer = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 5%;

  display: flex;
  flex-direction: column;
  overflow: visible;

  @media (min-width: 600px) {
    padding-bottom: 0;
    margin-bottom: 0;
  }

  @media (min-width: 1200px) {
    margin-right: auto;
    margin-left: auto;
  }
  width: 100%;
  height: 100%;
  ${(props) => (props.status === 'zoomed' || props.status === 'expanded') && css`
    display: flex;
    flex-direction: column;
    overflow: none;
    justify-content: center;
    position: relative;
    z-index: 200;
  `};

   @media (min-width: 600px) {
    ${(props) => props.status === 'default' && css`
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      overflow: visible;
    `};
  }
`;

const RightColumn = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  flex: 1 1 300px;
 /* max-width: 450px; */
  position: relative;

  @media (min-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: space-evenly;
    padding-left: 0.5em;
    max-width: 450px;
  }

  @media (min-width: 700px) {
    padding-left: 1em;
  }
`;
