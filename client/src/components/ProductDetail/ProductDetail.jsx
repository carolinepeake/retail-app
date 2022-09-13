import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdArrowForwardIos, MdArrowBackIos, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { HiArrowSmDown, HiArrowSmUp, HiArrowSmLeft, HiArrowSmRight } from 'react-icons/hi';
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
  const [isExpanded, setIsExpanded] = useState(false);

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
   // setMain(() => photos[place]);
  }

  function handleExpandMain(e) {
    e.preventDefault();
    setIsExpanded(true);
    console.log('main image clicked');
  }

  function handleClickExit(e) {
    setIsExpanded(false);
    e.preventDefault();
  }

  function handleClickArrow(n, e) {
    e.preventDefault();
    setPlace((prev) => prev + n);
  }

  return (
    <ProductSec id="product-details">
      <LeftTop>
        <MainContainer>
          <Main
            src={imageUrl}
            alt={`${productInfo.name} in ${selectedStyle.name} style`}
            onClick={(e) => handleExpandMain(e)}
          />
          <Side>
          {photosLength > 7 && place !== 0
            &&  <Buttons
                  style={{ height: '1.25em', width: '1.25em', alignSelf: 'center' }}
                  onClick={(e) => handleClickArrow(-1, e)}
                >
                  <MdExpandLess style={{ fontSize: '1.25em' }}/>
                </Buttons>}
          {photos
          &&
          photos.map((photo, index) => (
            place <= 6
            ? index <= 6
              && (index === place
                 ? <Thumbnail
                    src={photo.thumbnail_url}
                    key={photo.url}
                    index={index}
                    alt=""
                    onClick={(e) => changeMain(e, index)}
                    style={{boxShadow: "7px 7px 5px #242424", transform: "scale(1.025)", transition: "transform 0.25s ease"}}
                    // style={{boxShadow: "5px 5px 5px #ffffff"}}
                  />
                 : <Thumbnail
                  src={photo.thumbnail_url}
                  key={photo.url}
                  index={index}
                  alt=""
                  onClick={(e) => changeMain(e, index)}
                 />)
            : index >= place - 6 && index <= place
              && (index === place
                ? <Thumbnail
                   src={photo.thumbnail_url}
                   key={photo.url}
                   index={index}
                   alt=""
                   onClick={(e) => changeMain(e, index)}
                   style={{boxShadow: "7px 7px 5px #242424", transform: "scale(1.025)", transition: "transform 0.25s ease"}}
                   // style={{boxShadow: "5px 5px 5px #ffffff"}}
                 />
                : <Thumbnail
                 src={photo.thumbnail_url}
                 key={photo.url}
                 index={index}
                 alt=""
                 onClick={(e) => changeMain(e, index)}
                />)
            ))}
            {photosLength > 7 && place !== photosLength - 1
            &&  <Buttons
                  style={{ height: '1.25em', width: '1.25em', alignSelf: 'center' }}
                  onClick={(e) => handleClickArrow(1, e)}
                >
                  <MdExpandMore style={{ fontSize: '1.25em' }}/>
                </Buttons>}
          </Side>
          {photosLength < 4 && place > 0
          &&  <Buttons
                style={{ zIndex: 2, position: 'absolute', top: '48%', left: '2%', height: '2.5em', width: '2.5em' }}
                onClick={(e) => handleClickArrow(-1, e)}
              >
                <MdArrowBackIos style={{ fontSize: '2.0rem', paddingLeft: '0.25em' }}/>
              </Buttons>}
          {place > 0 && photosLength >= 4
          &&  <Buttons
                style={{ zIndex: 2, position: 'absolute', top: '48%', left: '15%', height: '2.5em', width: '2.5em' }}
                onClick={(e) => handleClickArrow(-1, e)}
              >
                <MdArrowBackIos style={{ fontSize: '2.0rem', paddingLeft: '0.25em' }} />
              </Buttons>}
          {place < photosLength - 1
          &&  <Buttons
                style={{ zIndex: 2, position: 'absolute', top: '48%', right: '2%', height: '2.5em', width: '2.5em' }}
                onClick={(e) => handleClickArrow(1, e)}
              >
                <MdArrowForwardIos style={{ fontSize: '2.0rem' }}/>
              </Buttons>}
        </MainContainer>
        </LeftTop>
        <br />
        <LeftBottom>
        {productInfo.slogan
        && <ProductSlogan>{productInfo.slogan}</ProductSlogan>}
        {productInfo.description
        && <ProductDescription>{productInfo.description}</ProductDescription>}
      </LeftBottom>
      <RightTop>
          <ProductOverview />
          <StyleSelector />
          <AddToCart />
      </RightTop>
      <Expanded style={{ display: isExpanded ? 'block' : 'none' }}>
        <ExpandedImg
          src={imageUrl}
          alt={`${productInfo.name} in ${selectedStyle.name} style`}
        />
        <Exit onClick={(e) => handleClickExit(e)}>&times;</Exit>
      </Expanded >
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
  grid-template-rows: auto;
  overflow: none;
  max-width: 100%;
`;

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

const LeftTop = styled.div`
  grid-column: 1/4;
  grid-row: 1;
  display: contents;
  width: 100%;
  height: 100%;
`;

const LeftBottom = styled.div`
  grid-row: 2;
  grid-column: 2/4;
  display: flex;
  flex-direction: column;
  height: max-content;
  max-width: 700px;
  margin: 0 auto;
`;

// const LeftSide = styled.div`
//   flex: 1 0.5;
//   display: grid;
//   grid-template-columns: 1fr 3fr 3fr;
//   grid-template-rows: 3fr 1fr
//   column-gap: 1em;
// `;


const RightTop = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 4 / span 2;
  grid-row: 1;
  align-items: space-between;
  justify-content: space-between;
`;

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
  display: flex;
  flex-direction: column;
  margin: 2% auto 0 auto;
  z-index: 2;
  align-self: start;
  position: absolute;
  max-width: 10%;
  height: 100%;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  row-gap: 0.75rem;
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
  margin: 0 auto;
  &:hover {
    opacity: 0.80;
  };
`;

//border-radius: 1px;

const MainContainer = styled.div`
  grid-column: 1/4;
  grid-row: 1;
  z-index: 1;
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: grid;
  overflow: hidden;
  height: max-content;
  max-width: 800px;
`;

// const MainContainer = styled.div`
//   //flex: 2 0.5;
//   object-fit: cover;
// `;

const Main = styled.img`
  object-fit: cover;
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 1;
  display: grid;
  aspect-ratio: 1;
  max-width: 800px;
  margin: 0 auto;
  height: 100%;
  cursor: zoom-in;
`;

const Expanded = styled.div`
  cursor: zoom-in;
  z-index: 3;
  grid-column: 1/6;
  grid-row: 1;
  background-color: white;
  overflow: none;
  width: 100%;
  margin: 0 auto;
  height: max-content;
  position: relative;
`;

const ExpandedImg = styled.img`
  object-fit: cover;
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 3;
  aspect-ratio: 1;
  margin: 0 auto;
  height: 100%;
  cursor: zoom-in;
`;

const Exit = styled.button`
  position: absolute;
  right: 1%;
  top: 1%;
  z-index: 4;
  opacity: 0.3;
  color: rgba(225 225 225 0.3);
  font-color: black;
`

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

// const ScrollUp = styled.button`
//   fontSize: "1.5rem";
//   backgroundColor: isUpHovering ? 'rgba(114, 114, 114, 0.5)' : '', color: isUpHovering ? 'white' : '', alignSelf: "center",  cursor: isUpHovering ? 'pointer' : ''}}
// `;

//background-color: rgba(114, 114, 114, 0.5);

const Buttons = styled.button`
  background-color: none;
  background-color: rgba(225, 225, 225, 0.5);
  &:hover {
    background-color: rgba(225, 225, 225, 0.8);
    cursor: pointer;
  };
  padding: 0;
  color: black;
  border: none;
  border-radius: 2.5px;
`;

const ProductSlogan = styled.h3`
  display: block;
  margin-block-start: 0.5em;
  margin-block-end: 0em;
  font-size: 1.0rem;
  font-weight: bold;
`;

// const ProductSlogan = styled.h3`
//   grid-column: 2 / 4;
//   grid-row: 2;
//   display: block;
// `;

const ProductDescription = styled.p`
  display: block;
  margin-block-end: 0em;
  font-size: 0.9rem;
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
