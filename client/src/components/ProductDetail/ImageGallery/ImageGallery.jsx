import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { MdArrowForwardIos, MdArrowBackIos, MdExpandMore, MdExpandLess } from 'react-icons/md';
//import { HiArrowSmDown, HiArrowSmUp, HiArrowSmLeft, HiArrowSmRight } from 'react-icons/hi';

import { useGlobalContext } from '../../../contexts/GlobalStore';

function ImageGallery() {

  const { productID, setProductID, productInfo, styles, selectedStyle, setSelectedStyle } = useGlobalContext();
  const [imageUrl, setImageUrl] = useState('');
  const [photos, setPhotos] = useState([]);
  const [main, setMain] = useState({});
  const [place, setPlace] = useState(0);
  const [photosLength, setPhotosLength] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  //const mainImage = useRef();

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

  // useEffect(() => {
  //   const computedImageHeight = parseInt(window
  //     .getComputedStyle(mainImage)
  //     .getPropertyValue("height"));
  // }, []);

  function changeMain(e, value) {
    e.preventDefault();
    setPlace(() => value);
   // setMain(() => photos[place]);
  };

  function handleClickArrow(n, e) {
    e.preventDefault();
    setPlace((prev) => prev + n);
  };

  function handleExpandMain(e) {
    e.preventDefault();
    setIsExpanded(true);
    console.log('main image clicked');
  };

  function handleClickExit(e) {
    setIsExpanded(false);
    e.preventDefault();
  };

  return (
    // <Wrapper>
    <ImageGalleryContainer>
      <Main
       // ref={mainImage}
        src={imageUrl}
        alt={`${productInfo.name} in ${selectedStyle.name} style`}
        onClick={(e) => handleExpandMain(e)}
      />
      <Side>
      {photosLength > 7 && place !== 0
       && <Buttons
            style={{ height: '1rem', width: '1rem', alignSelf: 'center' }}
            onClick={(e) => handleClickArrow(-1, e)}
          >
            <MdExpandLess style={{ fontSize: '1.25em' }}/>
          </Buttons>}
      {photos
       && photos.map((photo, index) => (
         place <= 6
         ? index <= 6
           &&
          //  (index === place
            //  ?
              <Thumbnail
                src={photo.thumbnail_url}
                key={photo.url}
                index={index}
                alt={`${selectedStyle.name} thumbnail`}
                onClick={(e) => changeMain(e, index)}
                style={{boxShadow: index === place ? '7px 7px 5px #242424' : '', transform: index === place ? 'scale(1.025)' : '', transition: index === place ? 'transform 0.25s ease' : ''}}
              />
      //         : <Thumbnail
      //           src={photo.thumbnail_url}
      //           key={photo.url}
      //           index={index}
      //           alt={`${style.name} thumbnail`}
      //           onClick={(e) => changeMain(e, index)}
      //  />)
  : index >= place - 6 && index <= place
    // && (index === place
      // ?
      &&
      <Thumbnail
         src={photo.thumbnail_url}
         key={photo.url}
         index={index}
         alt=""
         onClick={(e) => changeMain(e, index)}
         style={{boxShadow: index === place ? "7px 7px 5px #242424" : '', transform: index === place ? "scale(1.025)" : '', transition: index === place ? "transform 0.25s ease" : ''}}
         // style={{boxShadow: "5px 5px 5px #ffffff"}}
       />
      // : <Thumbnail
      //  src={photo.thumbnail_url}
      //  key={photo.url}
      //  index={index}
      //  alt=""
      //  onClick={(e) => changeMain(e, index)}
      // />)
  ))}
  {photosLength > 7 && place !== photosLength - 1
  &&  <Buttons
        style={{ height: '1rem', width: '1rem', alignSelf: 'center' }}
        onClick={(e) => handleClickArrow(1, e)}
      >
        <MdExpandMore style={{ fontSize: '1.25em' }}/>
      </Buttons>}
</Side>
{photosLength < 4 && place > 0
&&  <Buttons
      style={{ zIndex: 2, position: 'absolute', top: '48%', left: '2%', height: '2rem', width: '2rem', opacity: '0.5' }}
      onClick={(e) => handleClickArrow(-1, e)}
    >
      <MdArrowBackIos style={{ fontSize: '2.0rem', paddingLeft: '0.25em' }}/>
    </Buttons>}
{place > 0 && photosLength >= 4
&&  <Buttons
      style={{ zIndex: 2, position: 'absolute', top: '48%', left: '15%', height: '2rem', width: '2rem', opacity: '0.5' }}
      onClick={(e) => handleClickArrow(-1, e)}
    >
      <MdArrowBackIos style={{ fontSize: '2.0rem', paddingLeft: '0.25em' }} />
    </Buttons>}
{place < photosLength - 1
&&  <Buttons
      style={{ zIndex: 2, position: 'absolute', top: '48%', right: '2%', height: '2rem', width: '2rem', opacity: '0.5' }}
      onClick={(e) => handleClickArrow(1, e)}
    >
      <MdArrowForwardIos style={{ fontSize: '2.0rem' }}/>
    </Buttons>}
    </ImageGalleryContainer>


  );
};


    {/* <Expanded style={{ display: isExpanded ? 'block' : 'none' }}>
    <ExpandedImg
      src={imageUrl}
      alt={`${productInfo.name} in ${selectedStyle.name} style`}
    />
    <Exit onClick={(e) => handleClickExit(e)}>&times;</Exit>
  </Expanded >
  </Wrapper> */}

  // could make productDetails section have only one grid-template-row,
  // display LeftColumn flex, flex-direction: column, to get rid of gap between main image and product desciption when add to cart extends vertically past the main image.
  // or could make font-size for productDetail also dependent on vh (it's currently dependent only on vw)

// const Wrapper = styled.div`
//   grid-column: 1/4;
//   grid-row: 1;
//   display: contents;
//   width: 100%;
//   height: 100%;
// `;

const ImageGalleryContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: relative;
  display: grid;
  margin: 0 auto;
  overflow: hidden;
  height: max-content;
  max-width: 800px;
`;

// journal: needed to have display: grid (along with position: relative) to display image underneath thumbnail images with larger z-indexes, even though no grid-template columns or rows were set on the background image with display: grid;

// MVP journal: cannot select by fields in a mongodb document that is simply referenced by objectID in another schema.  you have to run the populate method to get the fields of the nested schema to populate in the outer model, and cannot then find by a certain field or value. instead, have to denormalize the data when you design your schemas.

// fill is a css property you can use to color in icons

// to make font-size responsive, set the root font-size to be a porportion of the view width, i.e. html {
 //font-size: () => 15px + 0.3vw;  // not 100% on my syntax but that's the jist
//},

// file input elements should work for mobile, and suggest file, access camera, access photos






// const ImageGallery2 = styled.div`
//   grid-column: 1/4;
//   grid-row: 1;
//   z-index: 1;
//   position: relative;
//   width: 100%;
//   margin: 0 auto;
//   display: grid;
//   overflow: hidden;
//   height: max-content;
//   max-width: 800px;
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

// grid-column: 1/4;
// grid-row: 1;

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
`;

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

export default ImageGallery;





