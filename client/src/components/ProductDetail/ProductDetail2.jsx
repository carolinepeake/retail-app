import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import ProductOverview from './ProductOverview/ProductOverview';
import StyleSelector from './StyleSelector/StyleSelector';
import ImageGallery from './ImageGallery/ImageGallery';
import AddToCart from './AddToCart/AddToCart';
import Features from './ProductOverview/Features';
import ProductPath from './ProductOverview/ProductPath';
import Button from '../reusable/Button';

import { useGlobalContext } from '../../contexts/GlobalStore';

// Works when ready to hook up API with URL
// setProductID(window.location.pathname || 40348);

function ProductDetail() {
  const { productInfo } = useGlobalContext();
  const [status, setStatus] = useState('default');
  const [collapsed, setCollapsed] = useState(true);

  return (
    <ProductSec id="product-details">

      <ProductPath />

      {/* <ImageGallery status={status} place={place} length={thumbnails.length}>
        <ThumbnailsContainer place={place} selectedStyle={selectedStyle._id}>
          {thumbnails}
            place={place} src={src}
          {scroll}
            place={place}
            // length={thumbnails.length} might not need this
        </ThumbnailsContainer>
        <MainImage>
          <Exit>
            // reusable
          </Exit>
        </MainImage>
        <Arrows status={status}
        place={place} length={thumbnails.length} // or visible
        />


      ImageGallery:
        @media (width <= 700px) {
          width: 100%;

          // same for expanded, pan, default
        } */}

      {/* <ImageGallery /> */}
      {status === 'default'
        ? (
          <>
            <ImageGallery
              status={status}
              setStatus={setStatus}
            />
            <Details>
              <Collapsible
                onClick={() => setCollapsed((prevCollapsed) => !prevCollapsed)}
                collapsed={collapsed}
              >
                <span>
                  Details
                </span>
                <span>
                  +
                </span>
              </Collapsible>
              {/* <Content> */}
              <LeftBottom collapsed={collapsed}>
                {productInfo.slogan
            && <ProductSlogan>{productInfo.slogan}</ProductSlogan>}
                {productInfo.description
            && <ProductDescription>{productInfo.description}</ProductDescription>}
              </LeftBottom>
              {productInfo.features && <Features collapsed={collapsed} />}
              {/* </Content> */}
            </Details>
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
  padding-left: 5%;
  padding-right: 5%;

  display: flex;
  flex-direction: column;

  margin-top: 1.5rem;

  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: 10% minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) 10%;
    grid-template-rows: max-content max-content max-content;
    column-gap: 1rem;
    row-gap: 1rem;
    max-width: 100%;

    padding-top: 0;
  }
`;



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
  order: 4;

  @media (min-width: 700px) {
    grid-column: 2 / 6;
    grid-row: 3 / 4;
    display: contents;
  };
`;

const Collapsible = styled(Button)`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 700px) {
    display: none;
  };
`;

// const Content = styled.div`

// `;

const LeftBottom = styled.div`
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
  ${(props) => props.collapsed && css`
    display: none;
  `};

  @media (min-width: 700px) {
    max-width: 800px;
    display: flex;
    flex-direction: column;
    grid-column: 2 / 4;
    grid-row: 3/4;
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

  order: 3;


  @media (min-width: 700px) {
    max-height: 800px;
    grid-column: 4 / span 2;
    grid-row: 2 / 3;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: space-evenly;
  }

  @media (min-width: 1200px) {
    grid-column: 4 / span 2;
    grid-row: 2 / 3;
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

  @media (min-width: 700px) {
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

  @media (min-width: 700px) {
    font-size: 1.0rem;
    margin-block-end: 0px;
    margin-block-start: 0px;
    padding-top: 1.0rem;
  }

`;

const Expanded = styled.div`
  grid-column: 1/6;
  grid-row: 1/3;
  overflow: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

// details
// ul
// list-style-type
// disclosure-closed
// disclosure-open
