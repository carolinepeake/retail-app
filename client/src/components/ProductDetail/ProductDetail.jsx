import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md'
import ProductOverview from './ProductOverview/ProductOverview';
import StyleSelector from './StyleSelector/StyleSelector';
//import ImageGallery from './ImageGallery/ImageGallery';
import AddToCart from './AddToCart/AddToCart';

import { useGlobalContext } from '../../contexts/GlobalStore';

// Works when ready to hook up API with URL
// setProductID(window.location.pathname || 40348);

function ProductDetail() {
  const { productID, productInfo, setProductID, setProductInfo, styles, selectedStyle, setSelectedStyle } = useGlobalContext();

  const [imageUrl, setImageUrl] = useState('');
  const [photos, setPhotos] = useState([]);
  const [main, setMain] = useState({});
  const [place, setPlace] = useState(0);
  const [photosLength, setPhotosLength] = useState(0);

  useEffect(() => {
    function getPhotos() {
      if (photos) {
        setMain(() => photos[place]);
        setPhotosLength(() => photos.length);
      }
    }
    function getUrl() {
      if (main) {
        setImageUrl(() => main.url);
      }
    }
    setPhotos(() => selectedStyle.photos);
    getPhotos();
    getUrl();
  }, [selectedStyle, photos, main, place]);


  function changeMain(e, value) {
    e.preventDefault();
    setPlace(() => value);
  }

  return (
    <ProductSec id="product-details">
        <MainContainer>
          <Main src={imageUrl}
          alt={`${productInfo.name} in ${selectedStyle.name} style`}
          />
          <MdArrowBackIos style={{ zIndex: 2, position: 'absolute', top: '48%', left: '15%' }} />
          <MdArrowForwardIos style={{ zIndex: 2, position: 'absolute', top: '48%', right: '2%' }} />
        </MainContainer>
        <Side>
        {photos
        && photos.map((photo, index) => (
          <Thumbnail
            src={photo.thumbnail_url}
            key={photo.url}
            index={index}
            alt=""
            onClick={(e) => changeMain(e, index)}
          />
        ))}
        </ Side>
        <LeftBottom>
        {productInfo.slogan
        && <ProductSlogan>{productInfo.slogan}</ProductSlogan>}
        {productInfo.description
        && <ProductDescription>{productInfo.description}</ProductDescription>}
      </LeftBottom>
      {/* <RightSide> */}
        <ProductOverview />
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

        <StyleName>
          <b>{'Style > '}</b>
          {selectedStyle.name}
        </StyleName>
        <StyleSelector />
        <AddToCart />
      {/* </RightSide> */}
    </ProductSec>
  );
}

export default ProductDetail;

// make a max-width (max size for the main image) maybe the standard height of a computer so can always see full square
// also make a max-width for the thumbnails -- although might not actually need to if main image has max width
// margin 0 auto then centers the main image if reaches max-width so there's white space around it


let ProductSec = styled.div`
  display: grid;
  grid-row: 2;
  grid-column: 1/4;
  grid-template-columns: 10% repeat(3, 1fr) 10%;
  column-gap: 1rem;
  grid-template-rows: 1fr 1.5rem 1rem 1fr 1fr 1.5rem 1fr;
  overflow: none;
  max-width: 100%;
`;

//   margin-top: 2%;
//   grid-column: 1/4;
//   //display: grid;
//   //grid-template-columns:
//  // grid-template-columns: 1fr 3fr 3fr 3fr 1fr;
//   //grid-auto-rows:
//   column-gap: 1em;
//   display: flex;
//   flex-direction: row;

const LeftBottom = styled.div`
  grid-row: 7/8;
  grid-column: 2/4;
  display: flex;
  flex-direction: column;
  height: max-content;
`;

// const LeftSide = styled.div`
//   flex: 1 0.5;
//   display: grid;
//   grid-template-columns: 1fr 3fr 3fr;
//   grid-template-rows: 3fr 1fr
//   column-gap: 1em;
// `;

// const RightSide = styled.div`
//   display: flex;
//   flex-direction: column;
//   grid-column: 4 / span 2;
//   grid-row: 1;
//   height: max-content;
// `;


// const RightSide = styled.div`
//  // display: contents;
//   display: flex;
//   flex-direction: column;
//   //display: grid;
//  // grid-auto-flow: row;
//   grid-column: 4 / span 2;
//   grid-row: 1;
//  // align-items: stretch;
//   flex: 0.5 1;
// `;

const Side = styled.div`
  grid-column: 1/2;
  grid-row: 1/6;
  display: flex;
  flex-direction: column;
  left-margin: 2%;
  top-margin: 2%;
  z-index: 2;
  align-self: start;
  position: relative;
  max-width: 100%;
  height: 100%;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
  row-gap: 1rem;
  height: max-content;
`;
//overflow: hidden;
//align-items: stretch or anything else

const Thumbnail = styled.img`
  max-width: 100%;
  border: .5px black solid;
  justify-content: center;
  z-index: 2;
  aspect-ratio: 1;
  object-fit: cover;
  max-height: 100px;
  cursor: pointer;
`;

const MainContainer = styled.div`
  grid-column: 1/4;
  grid-row: 1/6;
  z-index: 1;
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: grid;
  overflow: hidden;
  height: max-content;
`;

// const MainContainer = styled.div`
//   grid-column: 1 / 4;
//   grid-row: 1;
//   z-index: 1;
//   position: relative;
//   //flex: 2 0.5;
//   object-fit: cover;
// `;

const Main = styled.img`
  object-fit: cover;
  width: 100%;
  overflow: hidden
  position: relative;
  z-index: 1;
  display: grid;
  aspect-ratio: 1;
  max-width: 750px;
`;

// display: grid?

// const Main = styled.img`
//   //object-fit: scale-down;
//   //object-fit: contain;
//   height: 100%;
//   width: 100%;
//   // max-height: 100%;
//   //overflow: hidden
//   position: relative;
//   z-index: 1;
// //  display: grid;
// `;

const ProductSlogan = styled.h3`
  display: block;
  margin-block-start: 0em;
  margin-block-end: 0em;
  font-size: 1.17rem;
`;

// const ProductSlogan = styled.h3`
//   grid-column: 2 / 4;
//   grid-row: 2;
//   display: block;
// `;

const ProductDescription = styled.p`
  display: block;
  margin-block-end: 0em;
`;

const PriceContainer = styled.div`
  grid-row: 2/3;
  grid-column: 4;
`;

const Price = styled.h6`
  margin-block-start: 0em;
  margin-block-end: 0em;
`;

const StyleName = styled.h5`
  grid-row: 3/4;
  grid-column: 4;
  margin-block-start: 0em;
  margin-block-end: 0em;
  font-size: 1.17rem;
`;



// const ProductDescription = styled.p`
//   grid-column: 2 / 4;
//   grid-row: 2;
//   display: block;
// `;



//const Main = styled.img`
// grid-column: 1 / 9;
 // display: inherit;
 //display: grid;
 // grid-row: 2 / 4;
  // display: flex;
  // margin: 0%;
  // width: 70%;
  // flex: 1.5;
  // justify-content: space-between;
  // flex-direction: column;
//`;


// const Column2 = styled.div`
  // padding: 2% 2%;
 // text-align: left;
  // width: 30%;
  // display: flex;
  // flex-direction: column;
  // grid-column: 9 / 13;
  // grid-row: 2 / 4;
//`;
